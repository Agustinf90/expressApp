
let is_Admin = true;

export default function isAdmin(req, res, next) {
    if (!is_Admin) {
        throw new Error("Is not an admin")
    }
    next()
}

