import { getPermissionLevel } from "../../models/account.js";
import { reviewUserId } from "../../models/review.js";

/**
 * Authorization middleware for review operations
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {function} next Next middleware function
 */
const authorizeReviewAction = async (req, res, next) => {
    const reviewOwner = await reviewUserId(req.params.rid);
    const permissionLevel = await getPermissionLevel(req.session.user.user_id);
    
    if (req.session.user.user_id === reviewOwner || permissionLevel > 1) {
        return next();
    }
    
    req.flash("error", "You don't have permission to modify that review!");
    return res.redirect("/vehicle/" + req.params.id);
};

export default authorizeReviewAction;