# Exercício de front-end com Angular-JS

Comprove seus super conhecimentos de javascript, de angular js e de frameworks css construindo um dashboard de página única que contenha informações de performance da empresa.

Nós já organizamos o essencial para você. Este repositório possui a seguinte estrutura:
* bower_components -> Já inicializamos o [bower](http://bower.io/) na raiz do projeto para você adicionar novos componentes facilmente. Entenda como ele funciona e o que mais você pode adicionar aqui. Já deixamos o [jquery](http://jquery.com/), o [angular](https://angularjs.org/) e o [bootstrap](http://getbootstrap.com/). 
* img -> Você deve adicionar quaisquer imagens que forem utilizadas no seu projeto.
* scripts -> Coloque aqui os seus javascripts incluindo o que for angular-js
* styles -> Coloque aqui as suas folhas de estilo CSS. Você pode customizar qualquer framework CSS. Deixamos o bootstrap apenas como sugestão.
* data -> Aqui deixamos um exemplo de dados de dashboard de assinantes para que você possa consumir e mostrar o seu lindo dashboard. Utilize como se viesse de uma chamada a uma API.

## O dashboard

Seu objetivo neste exercício é construir um dashboard que contenha dois índices de performance a a respectiva quebra por tipo de assinatura. Você deve encontrar as informações necessárias no JSON localizado na pasta "data" que deve ser consumido via angular js em simulação a uma chamada de api.

Índices Obrigatórios:
* Mantidas -> Quantas assinantes foram mantidas e por qual tipo de assinatura
* Novas -> Quantas assinantes são novas na base e por qual tipo de assinataura

(Você pode mostar outros índices e quebras se achar mais informativo)

> 1 - Faça um fork neste repositório e altere na sua própria conta do github.

> 2 - Adicione as dependencias de frameworks utilizando o bower. Graficos, gauges e painéis são bem-vindos.

> 3 - Desenvolva seu código. É obrigatório que utilize angularjs para mostrar os dados. 

> 4 - Faça um pull request ou nos avise que finalizou o seu maravilhoso dashboard.

... um exemplo de dashboard para estimular suas idéias ...
![dashboard example](https://blog.kissmetrics.com/wp-content/uploads/2013/09/dashboard-widget-types.png)



**********************************

Instruções para rodar:

1. Clone o repositório;
2. Tenha a certeza que possui nodejs e npm instalados na máquina;
3. Na pasta raiz execute o comando "npm run init" para instalar as dependências;
4. Execute "npm server" para rodar o servidor local;
5. Abra no navegador o endereço fornecido pelo servidor.
