export const regex = {
  // Verifica se existe apenas números em uma string
  removeNonDigitsRegex: /[^\d]/g,

  // Verifica se uma string é composta por 6 números
  codeRegex: /^\d{6}$/,

  // Verifica a senha:
  //    - Se possui pelo menos 1 letra
  hasLetterRegex: /[A-Za-z]/,
  //    - Se possui pelo menos 1 número
  hasNumberRegex: /\d/,
  //    - Se possui pelo menos 1 caracter especial:
  //      (! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~)
  hasSpecialCharRegex: /[!@#$%^&*(),.?":{}|<>]/,
}
