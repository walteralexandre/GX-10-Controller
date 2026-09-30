Regras que você deverá seguir:
- Repostas sem enrolação e direto ao ponto. Tente uma linguagem de mais fácil entendimento (não muito técnica) tanto quanto possível.
- Sem misturar o código na explicação, explica e depois mostra o código.
- Não presumir nada sem analisar todos os cenários pertinentes.
- Dúvide de si mesmo, talvez a sua primeira analise não esteja correta, revise antes de devolver a resposta.
- Respostas ruins serão rejeitadas.
- Após cada solicitação, salve o contexto atual adicionando-o em @tmp/contexto.md, evitando que informações importantes sejam perdidas devido a limitações do tamanho do seu contexto.
- Você tem 10 minutos e 10k de limite de tokens para analisar cada enunciado/prompt neste contexto.
- Defina o idioma das suas respostas para português (pt-br).
- Para este projeto, use sempre a skill `caveman` se disponível.

Vamos construir um app controlador para o equipamento BOSS GX-10 (processador de efeitos para guitarra). 
Será um projeto baseado em tecnologia web (html, javascript, css). 
A interface gráfica iremos usar next.js, mas inicialmente iremos nos preocupar em criar algumas classes Javascript para enviar/receber mensagens midi para/de a gx-10.

Vamos começar então com a classe javascript `GX10` a ser salva em @js/gx10.class.js e incluir, inicialmente, métodos para conexão com a pedaleira gx10 usando a web midi api do javascript.
Teremos então funções para conectar, desconectar e verificar o status de conexão.
A classe deve manter em um atributo privado `connection` uma variável contendo a conexão, ou seja, uma variável que será utilizada para enviar/receber dados. 

Crie tambem um arquivo de teste `test-001-connection.html` com botões que, ao serem clicados, permitem testar as funcionalidades de conexão (conectar, desconectar e verificar status de conexão). Este e os próximos arquivos de teste deverão ser salvos sempre na pasta raiz do projeto e devem sempre seguir o nome padrão de nome `test-<numero_sequencial>-<contexto_a_ser_testado>.html`.

Novas funcionalidades serão adicionadas à esta classe javascript em momento posterior.
A documentação das capacidades MIDI da pedaleira (GX-10 MIDI Implementation) está disponível em @tmp/midi.pdf. Outros arquivos de referência que podem ser uteis são @tmp/parameter.pdf e @tmp/reference.pdf (mas creio que no momento não iremos precisar deles por enquanto). 
Uma vez que você irá precisar constantemente utilizar as informações do arquivo midi.pdf, você pode criar um resumo de @tmp/midi.pdf contendo as partes mais importantes que são necessárias sempre ter em mente e salvá-lo em @tmp/midi_resumo.md. No entanto, vez ou outra você ainda precisará consultar o @tmp/midi.pdf para algumas informações menos frequêntes.

Vamos iniciar o projeto desta forma, e posteriormente irei fornecendo novas instruções. A pasta raiz do projeto é `C:\wamp64\www\gx10`, tipicamente irei me referir aos arquivos e pastas do projeto como referências relativas a esta pasta raiz.
--------------------------------------

Ao acessar a página de teste obtive o seguinte erro no console do navegador:
```
Access to script at 'file:///C:/wamp64/www/gx10/js/gx10.class.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: brave, chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
test-001-connection.html:260  GET file:///C:/wamp64/www/gx10/js/gx10.class.js net::ERR_FAILED
```

Esta aplicação é destinada a ser executada localmente no computador (não apenas em testes mas também em produção), portanto ela deverá resolver (de forma definitiva) este problema de CORS. 
--------------------------------------

gemini --resume "7148bb2d-5d1c-44af-b7ed-a352a9ddadf5"
--------------------------------------

Vamos agora começar a criar algumas tabelas de parâmetros para os módulos de efeitos. A GX-10 possui diversos módulos diferentes e cada um possui seus parâmetros e valores. Para cada um vamos criar uma variável (algo como um array associativo ou objeto ou set, o que você achar mais adequado) na qual teremos a lista de parâmetros disponíveis e seus valores hexadecimais para código midi e também a faixa de valores de cada parâmetros e seus valores hexadecimais. Vamos começar com a tabela do módulo PREAMP. Dê uma olhada na tabela `MemoryFxItem` no arquivo @tmp/midi.pdf, ele parece ser um bom ponto de partida para você gerar uma estrutura que armazene os dados de um módulo. Para ter uma lista dos parâmetros disponíveis no módulo, você pode usar o arquivo @tmp/parameter.pdf (seção AIRD PREAMP).

Vamos começar apenas com o módulo de PREAMP e depois faremos os outros, mas tenha em mente criar uma estrutura de dados que sirva para qualquer módulo.
Antes de salvar em arquivo esta estrutura, mostre-me como ficará a estrutura do módulo. 
--------------------------------------

Ok, a estrutura parece boa, mas repare que todo módulo possui os parâmetros `ON/OFF` e `DuplicationNumber`, adicione-os à estrutura.
Salve a estrutura em arquivo. Você pode salvar no mesmo arquivo gx10.class.js ou, se achar mais adequado, criar um novo arquivo na mesma pasta para salvar esta e outras estruturas de dados.
--------------------------------------

gemini --resume "7148bb2d-5d1c-44af-b7ed-a352a9ddadf5"

Perfeito. Agora, usando do mesmo padrão, vamos para a próxima tabela de parâmetros para o módulo AC GUITAR SIMULATOR
--------------------------------------

Próximo módulo: AC RESONANCE. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: AIRD BASS PREAMP. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: CHORUS. Crie a tabela de parâmetros para ele.
--------------------------------------

gemini --resume "7148bb2d-5d1c-44af-b7ed-a352a9ddadf5"
Próximo módulo: BASS CHORUS. Crie a tabela de parâmetros para ele.
--------------------------------------

Verifique se você conseguiu finalizar a última requisição que foi a de criação da tabela de parâmetros para o módulo BASS CHORUS.
--------------------------------------

Ok. Vamos então para o próximo módulo: PRIME CHORUS. Crie a tabela de parâmetros para ele.
--------------------------------------

gemini --resume "7148bb2d-5d1c-44af-b7ed-a352a9ddadf5"

Próximo módulo: CLASSIC-VIBE. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: COMPRESSOR. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: X-COMP. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: X-BASS COMP. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: DEFRETTER. Crie a tabela de parâmetros para ele.
--------------------------------------

gemini --resume "7148bb2d-5d1c-44af-b7ed-a352a9ddadf5"

Próximo módulo: BASS DEFRETTER. Crie a tabela de parâmetros para ele.
--------------------------------------

Continue seguindo as regras estabelescidas antes:
```
Regras que você deverá seguir:
- Repostas sem enrolação e direto ao ponto. Tente uma linguagem de mais fácil entendimento (não muito técnica) tanto quanto possível.
- Sem misturar o código na explicação, explica e depois mostra o código.
- Não presumir nada sem analisar todos os cenários pertinentes.
- Dúvide de si mesmo, talvez a sua primeira analise não esteja correta, revise antes de devolver a resposta.
- Respostas ruins serão rejeitadas.
- Após cada solicitação, salve o contexto atual adicionando-o em @tmp/contexto.md, evitando que informações importantes sejam perdidas devido a limitações do tamanho do seu contexto.
- Você tem 10 minutos e 10k de limite de tokens para analisar cada enunciado/prompt neste contexto.
- Defina o idioma das suas respostas para português (pt-br).
```

Vamos para o próximo módulo: DELAY. Crie a tabela de parâmetros para este módulo seguindo o mesmo padrão dos outros módulos já criados anteriormente.

Quanto à sua sugestão, a ordem dos parâmetros não está bem documentada, então irei continuar criando os módulos e depois disso começarei a realizar testes para determinar a ordem correta. No entanto é provável que a ordem seja a mesma ordem em que aparecem nas listagens da documentação, então por enquanto vamos seguindo essa ordem e depois eu confirmo por meio de testes.
--------------------------------------

Perfeito, agora vamos para o próximo módulo: DELAY PLUS. Crie a tabela de parâmetros para ele.
--------------------------------------

Próximo módulo: ANALOG DELAY. Crie a tabela de parâmetros para ele.
--------------------------------------

Agora a tabela de parâmetros para o próximo módulo: SPACE ECHO
--------------------------------------

Próximo módulo: SHIMMER DELAY
--------------------------------------

Próximo módulo: TWIST
--------------------------------------

Próximo módulo: WARP
--------------------------------------

claude --resume 197ff339-3de8-4fc2-88da-22f54792cea4
--------------------------------------

Próximo módulo: PARAMETRIC EQUALIZER
--------------------------------------

Próximo módulo: GRAPHIC EQUALIZER
--------------------------------------

Próximo módulo: FLANGER
--------------------------------------
Próximo módulo: BASS FLANGER
--------------------------------------
Próximo módulo: FLANGER PRIME
--------------------------------------
Próximo módulo: BASS FLANGER PRIME
--------------------------------------
Próximo módulo: HARMONIST
--------------------------------------
Próximo módulo: BASS HARMONIST
--------------------------------------
Próximo módulo: PHRASE LOOP
--------------------------------------
Próximo módulo: DIVIDER
--------------------------------------
Próximo módulo: SPLITTER
--------------------------------------
Próximo módulo: MIXER
--------------------------------------
Próximo módulo: NOISE SUPPRESSOR
--------------------------------------
claude --resume 197ff339-3de8-4fc2-88da-22f54792cea4

Próximo módulo: OCTAVE
--------------------------------------
Próximo módulo: OCTAVE POLY
--------------------------------------
Próximo módulo: OCTAVE BASS
--------------------------------------
Próximo módulo: BOOSTER
--------------------------------------
Próximo módulo: OVERDRIVE
--------------------------------------
Próximo módulo: BASS OVERDRIVE
--------------------------------------
Próximo módulo: DISTORTION
--------------------------------------
Próximo módulo: BASS DISTORTION
--------------------------------------
Próximo módulo: FUZZ
--------------------------------------
Próximo módulo: BASS FUZZ
--------------------------------------
Próximo módulo: X-OD
--------------------------------------
Próximo módulo: X-BASS OD
--------------------------------------
Próximo módulo: X-DS
--------------------------------------
Próximo módulo: METAL
--------------------------------------
Próximo módulo: BASS METAL
--------------------------------------
Próximo módulo: OVERTONE
--------------------------------------
Próximo módulo: PAN
--------------------------------------
Próximo módulo: FOOT VOLUME
--------------------------------------
Próximo módulo: PEDAL BEND
--------------------------------------
Próximo módulo: BASS PEDAL BEND
--------------------------------------
Próximo módulo: WAH
--------------------------------------
Próximo módulo: BASS_WAH
--------------------------------------
claude --resume 197ff339-3de8-4fc2-88da-22f54792cea4

Próximo módulo: PHASER
--------------------------------------
Próximo módulo: BASS PHASER
--------------------------------------
Próximo módulo: PRIME PHASER
--------------------------------------
Próximo módulo: PRIME BASS PHASER
--------------------------------------
Próximo módulo: SCRIPT PHASER
--------------------------------------
Próximo módulo: PITCH SHIFTER
--------------------------------------
Próximo módulo: BASS PITCH SHIFTER
--------------------------------------
Próximo módulo: REVERB
--------------------------------------
Próximo módulo: REVERB PLUS
--------------------------------------
Próximo módulo: SHIMMER REVERB
--------------------------------------
Próximo módulo: TERA ECHO
--------------------------------------
Próximo módulo: RING MODULATOR
--------------------------------------
Próximo módulo: ROTARY
--------------------------------------
Próximo módulo: S-BEND
--------------------------------------
Próximo módulo: BASS S-BEND
--------------------------------------
Próximo módulo: SLOW GEAR
--------------------------------------
Próximo módulo: BASS SLOW GEAR

TOUCH WAH, BASS TOUCH WAH, TREMOLO, VIBRATO, VIBRATO PRIME, SEND/RETURN, SLICER, HUMANIZER, FEEDBACKER, SITAR SIM, AUTO WAH 
--------------------------------------


--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
---------------------------------------