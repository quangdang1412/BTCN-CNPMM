import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import User from "../models/user";
import CRUDService from "../services/CRUDService";

const getHomePage = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  try {
    const data: any = await User.find({});
    console.log("...........................");
    console.log(data);
    console.log("...........................");
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const getAboutPage = (req: ExpressRequest, res: ExpressResponse): void => {
  res.render("test/about.ejs");
};

const getCRUD = (req: ExpressRequest, res: ExpressResponse): void => {
  res.render("crud.ejs");
};

const getFindAllCrud = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  const data = await CRUDService.getAllUser();
  res.render("users/findAllUser.ejs", {
    datalist: data,
  });
};

const postCRUD = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.redirect("/get-crud");
};

const getEditCRUD = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  const userId = req.query.id as string | undefined;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    res.render("users/editUser.ejs", {
      data: userData,
    });
  } else {
    res.send("không lấy được id");
  }
};

const putCRUD = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  const data = req.body;
  const data1 = await CRUDService.updateUser(data);
  res.render("users/findAllUser.ejs", {
    datalist: data1,
  });
};

const deleteCRUD = async (
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> => {
  const id = req.query.id as string | undefined;
  if (id) {
    await CRUDService.deleteUserById(id);
    res.redirect("/get-crud");
  } else {
    res.send("Not find user");
  }
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
