// Clase personalizada para manejar errores de la app
export class AppError extends Error {
    constructor(message, status = 500) {
        super(message); // Llama al constructor de Error

        // Código de estado HTTP (por defecto 500)
        this.status = status;

        // Nombre del error (útil para identificarlo)
        this.name = 'AppError';
    }
}