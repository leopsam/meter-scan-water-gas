import { Request, Response } from 'express';
import measureService from './../services/measure-services';
//import httpStatus from "http-status";
//import { User } from "../types/user-type";

export async function getAllMeasure(req: Request, res: Response) {
  try {
    const AllMeasure = await measureService.getAllMeasure();
    return res.status(200).send(AllMeasure);
  } catch (err) {
    return res.status(404).send(err);
  }
}

/*
export async function usersPost(req: Request, res: Response) {
  const userData: User = req.body;

  try {
    await userService.createUser( userData );
    return res.status(httpStatus.CREATED).send("User created successfully");
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
}
*/
