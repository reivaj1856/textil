import { Component, inject } from '@angular/core';
import { NavComponent } from '../../../component/nav/nav.component';
import { FormBuilder,  FormControl,  ReactiveFormsModule,  Validators,} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { hasEmailError, isRequired } from '../../../segurity/validators';
import { toast } from 'ngx-sonner';


interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [NavComponent,ReactiveFormsModule],
  templateUrl: './sign-in.component.html'
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  constructor(private router: Router,public auth: AuthService ) {}
  

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;

      await this._authService.singIn( email, password );
      await this._authService.reloadUser();

      if (this._authService.isEmailVerified$) {
        toast.success('Inicio de sesion autenticado');
        this.router.navigateByUrl('/content');
      } else {
        toast.info('Verifica tu correo para continuar');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      toast.error('Ups, ocurrió un error');
    }
  }

  async submitWithGoogle(){
    try{
      await this._authService.singInWithGoogle()
      this.router.navigateByUrl('/content'); 
      toast.success('Inicio de sesion autenticado')

    }catch(error){
      toast.success('Cuenta no valida')
    }
  }
}
