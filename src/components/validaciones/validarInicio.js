export const validarInicio = ({ nombre, password }) => {
    const errores = {};

    if (!nombre.trim()) {
        errores.nombre = "El nombre es obligatorio";
    } else if (nombre.length < 3) {
        errores.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errores.nombre = "El nombre solo puede contener letras";
    }

    if (!password.trim()) {
        errores.password = "La contraseña es obligatoria";
    } else {
        if (password.length < 6) {
            errores.password = "Debe tener al menos 6 caracteres";
        } else if (!/[A-Z]/.test(password)) {
            errores.password = "Debe incluir al menos una mayúscula";
        } else if (!/[a-z]/.test(password)) {
            errores.password = "Debe incluir al menos una minúscula";
        } else if (!/[0-9]/.test(password)) {
            errores.password = "Debe incluir al menos un número";
        } else if (!/[!@#$%^&*_]/.test(password)) {
            errores.password = "Debe incluir al menos un carácter especial";
        }
    }


    return errores;
};