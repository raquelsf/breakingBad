import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SuggestionsService} from '../../../services/suggestions/suggestions.service';
import {LoadingService} from '../../../services/core/loading.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-form-suggestions',
  templateUrl: './form-suggestions.component.html',
  styleUrls: ['./form-suggestions.component.scss']
})
export class FormSuggestionsComponent implements OnInit {
  public form;
  public isSubmitted;
  constructor(private formBuilder: FormBuilder,
              private suggestionService: SuggestionsService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.form = this.getForm();
  }

  /**
   * retorna o formulario com suas validacoes
   */
  getForm() {
    return this.formBuilder.group({
      message: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  //TODO testar resposta qando api nao estiver disponivel
  onSubmit() {
    this.isSubmitted = true;
    if(this.form.valid) {
      this.suggestionService.post(this.form.value).then(res => {
        this.toastr.success('Sua sugestção foi enviada com sucesso', '!');

      }).catch(err => {
        console.log(err);
        if (err.code === 200) {
          this.toastr.warning('Alguns campos não foram preenchidos corretamente. ', '!');
        }
        if (err.code === 422) {
          this.toastr.warning('Alguns campos não foram preenchidos corretamente. ', '!');
        }
        if (err.code === 500) {
          this.toastr.warning('Sua sugestão não pode ser enviada agora. Tente mais tarde. ', '!');
        }
        if (err.code === 404) {
          this.toastr.warning('Sua sugestão não pode ser enviada agora. Tente mais tarde. ', '!');
        }
      });
    } else {
      this.toastr.warning('Alguns campos não foram preenchidos corretamente. ', '!');
    }

  }
}
