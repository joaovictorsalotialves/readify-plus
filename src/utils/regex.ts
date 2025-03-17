export const regex = {
  // Verifica o formato do email
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Verifica se existe apenas números em uma string
  numberRegex: /[^\d]/g,

  // Verifica se uma string é composta por 6 números
  codeRegex: /^\d{6}$/,

  // Verifica a senha:
  //    - Se possui pelo menos 8 caracteres
  //    - Se possui pelo menos 1 letra
  //    - Se possui pelo menos 1 número
  //    - Se possui pelo menos 1 caracter especial:
  //      (! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~)
  passwordRegex:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
}
