module.exports.isLoggIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to create a new listing');
        return res.redirect('/login');
    }
    next();

}

module.exports.savedRedirectUrl = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectTo = req.session.returnTo;
    }
    next();
};