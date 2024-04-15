import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = withReactContent(Swal);

//Custom alert con timer de 3 segundos se cierra automatico
export const customAlert = (title, text, icon) => {
  return SweetAlert.fire({
    title,
    text,
    icon,
    timer: 2000,
    iconColor: "#9dc88d",
    timerProgressBar: true,
    showConfirmButton: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    color: "#164a41",
    toast: true,
  });
};
