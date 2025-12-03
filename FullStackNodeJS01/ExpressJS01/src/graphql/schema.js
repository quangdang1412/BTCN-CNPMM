import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import cartService from "../services/cartService.js";
import orderService from "../services/orderService.js";

// Product Type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    image: { type: GraphQLString },
    stock: { type: GraphQLInt },
  }),
});

// CartItem Type
const CartItemType = new GraphQLObjectType({
  name: "CartItem",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    selected: { type: GraphQLBoolean },
    Product: {
      type: ProductType,
      resolve: (parent) => parent.product || parent.Product,
    },
    subtotal: {
      type: GraphQLFloat,
      resolve: (parent) => {
        const product = parent.product || parent.Product;
        return product ? product.price * parent.quantity : 0;
      },
    },
  }),
});

// Cart Type
const CartType = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    items: { type: new GraphQLList(CartItemType) },
    totalItems: { type: GraphQLInt },
    totalAmount: { type: GraphQLFloat },
    selectedTotalAmount: { type: GraphQLFloat },
  }),
});

// OrderItem Type
const OrderItemType = new GraphQLObjectType({
  name: "OrderItem",
  fields: () => ({
    id: { type: GraphQLInt },
    orderId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    productName: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    subtotal: {
      type: GraphQLFloat,
      resolve: (parent) => parent.price * parent.quantity,
    },
  }),
});

// Order Type
const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    totalAmount: { type: GraphQLFloat },
    status: { type: GraphQLString },
    shippingAddress: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    notes: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    OrderItems: { type: new GraphQLList(OrderItemType) },
  }),
});

// Response Type
const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    data: { type: GraphQLString },
  }),
});

// Input Types
const OrderItemInputType = new GraphQLInputObjectType({
  name: "OrderItemInput",
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Get Cart
    cart: {
      type: CartType,
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await cartService.getCartByUserId(context.user.id);
      },
    },

    // Get Cart Item by ID
    cartItem: {
      type: CartItemType,
      args: { cartId: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        const cart = await cartService.getCartByUserId(context.user.id);
        return cart.items.find((item) => item.id === args.cartId);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add to Cart
    addToCart: {
      type: CartItemType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: GraphQLInt, defaultValue: 1 },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await cartService.addToCart(
          context.user.id,
          args.productId,
          args.quantity
        );
      },
    },

    // Update Cart Item
    updateCartItem: {
      type: CartItemType,
      args: {
        cartId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await cartService.updateCartItem(
          context.user.id,
          args.cartId,
          args.quantity
        );
      },
    },

    // Toggle Select Cart Item (for checkout)
    toggleSelectCartItem: {
      type: CartItemType,
      args: {
        cartId: { type: new GraphQLNonNull(GraphQLInt) },
        selected: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await cartService.toggleSelectCartItem(
          context.user.id,
          args.cartId,
          args.selected
        );
      },
    },

    // Select Multiple Cart Items
    selectMultipleCartItems: {
      type: new GraphQLList(CartItemType),
      args: {
        cartIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
        selected: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await cartService.selectMultipleCartItems(
          context.user.id,
          args.cartIds,
          args.selected
        );
      },
    },

    // Remove from Cart
    removeFromCart: {
      type: ResponseType,
      args: {
        cartId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        await cartService.removeFromCart(context.user.id, args.cartId);
        return {
          success: true,
          message: "Item removed from cart successfully",
        };
      },
    },

    // Clear Cart
    clearCart: {
      type: ResponseType,
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        await cartService.clearCart(context.user.id);
        return {
          success: true,
          message: "Cart cleared successfully",
        };
      },
    },

    // Checkout Selected Items
    checkoutSelectedItems: {
      type: OrderType,
      args: {
        shippingAddress: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await orderService.createOrderFromSelectedCartItems(
          context.user.id,
          args.shippingAddress,
          args.phoneNumber,
          args.notes
        );
      },
    },

    // Checkout All Cart Items
    checkoutCart: {
      type: OrderType,
      args: {
        shippingAddress: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await orderService.createOrderFromCart(
          context.user.id,
          args.shippingAddress,
          args.phoneNumber,
          args.notes
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
