import { set } from "mongoose";
import {  templateSchema } from "../models/templateSchema";

export async function createTemplate(req, res) {
  try {
    if (req.body.template_name && req.body.template_body) {
      const { template_name, template_body } = req.body;
      const template = new templateSchema({
        template_name,
        template_body,
      });
      template.save((err, data) => {
        if (data) {
          return res.status(200).json({status:'true', message: "template created successfully" });
        } else if (err) {
          console.log(err);
          return res.status(400).json({status:'false', message: "template creation failed Please contact support" });
        }
      });
    } else {
      return res
        .status(400)
        .json({
          status: "false",
          message: "please provide a template name and body",
        });
    }
  }catch (err) {  return res
    .status(500)
    .json({ status: "false", message: "internal error please contact support" }); }
    }
 

 export async function getTemplateById(req, res) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      templateSchema.findOne({ _id: id }).then((template) => {
        // const data = template.template_name
        // let Name = "Ebin ";
        // const newdata = data.replace("name", Name);
        
        if (template) {
          return res.status(200).json({
            status: "true",
            message: "template fetched successfully",
            data: template,
          });
        } else {
          return res
            .status(200)
            .json({ status: "false", message: "template is not found" });
        }
      });
    } else {
      return res.status(400).json({status: "false", message: "template id is not Valid" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        status: "false",
        message: "internal error please contact support",
      });
  }
 }

  export async function sendSmsById(req, res) {
    try {
      if (req.body.template_name) {
        const id = {
          template_name: req.body.template_name,
          template_body: req.body.template_body,
        };
        return res.status(200).json({
          status: "true",
          message: "template fetched successfully",
          data: id,
        });
      } else {
        return res
          .status(400)
          .json({ status: "false", message: "template id is not Valid" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "false",
        message: "internal error please contact support",
      });
    }
  }

export async function listTemplates(req, res) {
  try {
    templateSchema
      .find()
      .then((template) => {
        res
          .status(200)
          .json({
            status: "true",
            message: "template fetched successfully",
            data: template,
          });
      })
      .catch((error) => {
        res
          .status(400)
          .json({
            status: "false",
            message: "templates  not found",
            data: error,
          });
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        status: "false",
        message: "internal error please contact support",
      });
  }
}


