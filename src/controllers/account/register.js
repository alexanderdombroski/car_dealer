/**
 * Render Register Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const registerPageController = async (_req, res) => {
    res.render('account/register', {title: "Create Account"});
};

/**
 * Controller to register a new user
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const registerHandlerController = async (req, res) => {
    if (await userExists(req.body.username)) {
        req.flash("error", "Username already taken!");
        res.redirect("/account/register");
        return;
    }

    registerUser(req.body.first_name, req.body.last_name, req.body.username, req.body.email, req.body.password);
    res.redirect("/account/login");
};