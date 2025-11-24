export class Person {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public username: string = '',
    public password: string = '',
    public confirmPassword: string = '',
    public ssn: string = '', // henkilötunnus
    public acceptTerms: boolean = false
  ) {}
}