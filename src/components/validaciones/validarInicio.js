export const validarInicio = ({ nombre, password }) => {
    const errores = {};

    if (!nombre.trim()) {
        errores.nombre = "El nombre es obligatorio";
    } else if (nombre.length < 3) {
        errores.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errores.nombre = "El nombre solo puede contener letras";
    }

    return errores;
};