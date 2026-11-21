# Top Clim Climatização

Site institucional para a Top Clim, de Itaperuna e região (RJ). Apresenta os serviços da empresa, três trabalhos publicados no Instagram e um formulário que prepara uma mensagem de orçamento para o Instagram Direct.

## Abrir o site localmente

O projeto usa HTML, CSS e JavaScript. Os arquivos do site estão em `dist/`. Para testar localmente, execute a partir da raiz do repositório:

```sh
python3 -m http.server 8000 --directory dist
```

Abra [localhost:8000](http://localhost:8000) no navegador. Para hospedar em outro serviço estático, publique o conteúdo de `dist/`.

## Editar o conteúdo

- `dist/index.html` reúne o conteúdo, os projetos e os links para contato.
- `dist/styles.css` controla a identidade visual e os layouts responsivos.
- `dist/script.js` controla o menu móvel e a geração da mensagem de orçamento.

O formulário funciona no navegador. O visitante copia a mensagem e decide quando enviá-la na conversa do Instagram.

## Referências e imagens

- Logo, área de atendimento e serviços vêm do [perfil da Top Clim](https://www.instagram.com/topclimclimatizacao/).
- As imagens do portfólio são capas de publicações da empresa sobre a [Academia World Fitness](https://www.instagram.com/reel/DCoYiXUOSQf/), a [retirada do LG Dual Voice Inverter](https://www.instagram.com/reel/DARlRlDS3mT/) e a [higienização do Electrolux](https://www.instagram.com/reel/DAEdMp3y1Ze/).
- As duas fotos institucionais são ilustrações geradas para a apresentação.
- A fonte Manrope é distribuída sob a [SIL Open Font License](dist/assets/manrope-OFL.txt).
