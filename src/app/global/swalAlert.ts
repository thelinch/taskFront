import swal from 'sweetalert2';
export class SwalAlert {
    static getMessageSuccess(message: string) {
        return swal.fire({
            type: "success",
            text: message,
            timer: 2000,
            showConfirmButton: true
        })
    }
    static getMessageError(message: string) {
        return swal.fire({
            type: "error",
            text: message,
            showConfirmButton: true
        })
    }
    static getMessageQuestion(message: string) {
        return swal.fire({
            type: "question",
            text: message,
            showConfirmButton: true
        })
    }

}