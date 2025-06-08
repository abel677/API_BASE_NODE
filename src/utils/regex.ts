export class Regex {
    static password(): RegExp {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
    }

    static email(): RegExp {
        return /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"[^\n\r"]+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    }
}
  