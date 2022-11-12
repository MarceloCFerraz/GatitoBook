import { FormGroup } from "@angular/forms";

export function senhaIgualUsernameValidator(formGroup: FormGroup) {
  const username = formGroup.get("userName")?.value ?? "";
  const password = formGroup.get("password")?.value ?? "";

  return username !== password || !username || !password
    ? null
    : { senhaIgualUsuario: true };
}
