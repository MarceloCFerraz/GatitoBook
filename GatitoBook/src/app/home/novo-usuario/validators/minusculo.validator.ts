import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  // @returns
  // An error map with the required property if the validation check fails, otherwise null.
  let retorno = null;
  const valor = control.value as string;

  if (valor !== valor.toLowerCase()) {
    // Essa validação pode ser confusa, mas a ideia principal é:
    // se o valor não estiver em lower case, a validação tem que
    // alertar o usuário, por isso deve retornar 'minusculo: true'
    // e no *ngIf, erro que vai buscar essa validação deve
    // possuir o mesmo nome da propriedade do objeto retorno
    retorno = { minusculo: true };
  }

  return retorno;
}
