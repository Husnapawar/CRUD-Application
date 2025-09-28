import { NextFunction, Request ,Response } from "express";    
import roles from  "../config/roles.json";
import { loginUser } from "../types";
import { roleData } from "../types";

export function authorisePermission(permission: string) {
    return (req: Request, res: Response, next: NextFunction) => {

        const userRole = (req as any).user?.role; // Assuming req.user is populated by previous middleware
        console.log("User Role in RBAC Middleware:", userRole);
        if(!userRole) {
            return res.status(401).json({ error: "unothorized! no model found" });
        }
 // Find role  in roles.json
//  const roleConfig = roles.role.find((r) => r.name === userRole);
const roleConfig = roles.roles.find((r) => r.name === userRole);

 if(!roleConfig) {
    return res.status(403).json({message: "Access denied! role not found"});
 }
 // check permission is in this role permissions
      if(!roleConfig.permissions.includes(permission)) {
        return res.status(403).json({message : "Access denied! Insufficient permission"});
      }
      next();
    }
};