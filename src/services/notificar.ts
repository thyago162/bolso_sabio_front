import 'vue-toast-notification/dist/theme-sugar.css';
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

export default function notificar(icon: string, text: string) {
    $toast.open({
        type: icon,
        message: text,
        position: 'top',
        duration: 5000
      })
}