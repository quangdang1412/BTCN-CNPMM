# Core Cart Library

Một thư viện React cho chức năng Giỏ hàng với các component chuẩn hóa.

## Cài đặt

```bash
npm install core-cart-lib
```

## Sử dụng

```tsx
import { ShoppingCart, Button, Input, Modal, Card } from "core-cart-lib";

function App() {
  return (
    <div>
      <ShoppingCart />
    </div>
  );
}
```

## Components

### ShoppingCart

Component chính cho giỏ hàng với khả năng thêm, sửa, xóa sản phẩm.

```tsx
<ShoppingCart />
```

### Button

Component button chuẩn hóa.

```tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

Props:

- `children`: Nội dung button
- `onClick`: Hàm xử lý click
- `variant`: 'primary' | 'secondary' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `className`: string

### Input

Component input chuẩn hóa.

```tsx
<Input value={value} onChange={setValue} placeholder="Enter text" />
```

Props:

- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string
- `type`: 'text' | 'number' | 'email' | 'password'
- `disabled`: boolean
- `className`: string

### Modal

Component modal chuẩn hóa.

```tsx
<Modal isOpen={isOpen} onClose={closeModal} title="Modal Title">
  <p>Modal content</p>
</Modal>
```

Props:

- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `children`: React.ReactNode
- `className`: string

### Card

Component card chuẩn hóa.

```tsx
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

Props:

- `children`: React.ReactNode
- `className`: string
- `onClick`: () => void

## Phát triển

```bash
npm install
npm run build
```

## License

MIT
