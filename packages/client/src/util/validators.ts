export function ValidateEmail(mail) {
    // tslint:disable-next-line: max-line-length
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
