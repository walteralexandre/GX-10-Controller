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
--------------------------------------
Próximo módulo: TOUCH WAH
--------------------------------------
Próximo módulo: BASS TOUCH WAH
--------------------------------------
Próximo módulo: TREMOLO
--------------------------------------
Próximo módulo: VIBRATO
--------------------------------------
Próximo módulo: VIBRATO PRIME
--------------------------------------
Próximo módulo: SEND/RETURN
--------------------------------------
Próximo módulo: SLICER
--------------------------------------
Próximo módulo: HUMANIZER
--------------------------------------
Próximo módulo: FEEDBACKER
--------------------------------------
Próximo módulo: SITAR SIM
--------------------------------------
Próximo módulo: AUTO WAH
--------------------------------------

Perfeito. Vamos agora criar uma nova página de testes chamada test-002-add-remove-blocks.html. Nesta página devo ser capaz de adicionar e remover blocos.                                                                                                                                                                     
--------------------------------------

Testei o teste-002.                                                                                                                                                                                                                                                                                                           
Conectou corretamente, e fez a leitura da caideia da pedaleira. Após isso consegui remover o primeiro bloco. Mas após isso não consegui nem remover e nem adicionar algm outro bloco (mesmo atualizando a página e tentando novamente).                                                                                       
Nenhum erro apresentado no console ou nas mensagens e bytes trocados.  
--------------------------------------

Atuelizei a página, conectei e cliquei em ler cadeia da pedaleira. Até aqui tudo bem.                                                                                                                                                                                                                                         
Cliquei em diagnóstico de gravação, foi gerado o seguinte texto:                                                                                                                                                                                                                                                              
```                                                                                                                                                                                                                                                                                                                           
[07:37:17]SysEx recebido — comando 12H, endereço 10 00 0F 00, 62 byte(s)                                                                                                                                                                                                                                                      
[07:37:28]=== Diagnóstico de gravação ===                                                                                                                                                                                                                                                                                     
[07:37:28]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:37:28]Cadeia agora: 02 00 03 06 08 0A 07 04 09 05 0B 0C 0D 00 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31                                                                                                                                                 
[07:37:28]Teste 1: gravar NEXT ITEM0 (byte 1, bloco fora da cadeia).                                                                                                                                                                                                                                                          
[07:37:28]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:37:28] enviei 50, pedaleira ficou com 0 => ponteiro IGNORADO                                                                                                                                                                                                                                                              
[07:37:28]Teste 2: gravar um byte só (DT1 curto) no mesmo endereço do ponteiro.                                                                                                                                                                                                                                               
[07:37:29]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:37:29] endereço 10 00 0F 0D: IGNORADO                                                                                                                                                                                                                                                                                     
[07:37:29]=== Fim do diagnóstico. Valores originais devolvidos. ===                                                                                                                                                                                                                                                           
```                                                                                                                                                                                                                                                                                                                           
																																																																															
Cliquei para remover um bloco no meio da cadeia de efeitos. Não foi removido, mas o texto obtido diz:                                                                                                                                                                                                                         
```                                                                                                                                                                                                                                                                                                                           
[07:38:46]Removendo o bloco id 6 (Fx Item 7)...                                                                                                                                                                                                                                                                               
[07:38:46]Bloco anterior na cadeia: id 5.                                                                                                                                                                                                                                                                                     
[07:38:46]Gravando a cadeia (DT1 em 10 00 0F 0C): 02 00 03 06 08 0A 04 00 09 05 0B 0C 0D 00 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:38:46]A PEDALEIRA NÃO ACEITOU 2 byte(s):                                                                                                                                                                                                                                                                                  
[07:38:46] NEXT ITEM5 (byte 6): enviei 4, pedaleira ficou com 7                                                                                                                                                                                                                                                               
[07:38:46] NEXT ITEM6 (byte 7): enviei 0, pedaleira ficou com 4                                                                                                                                                                                                                                                               
[07:38:46]Bloco removido. Relendo para conferir...                                                                                                                                                                                                                                                                            
[07:38:46]Pedindo a cadeia (RQ1 em 10 00 0F 0C, 50 bytes)...                                                                                                                                                                                                                                                                  
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:38:46]Cadeia crua: 02 00 03 06 08 0A 07 04 09 05 0B 0C 0D 00 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31                                                                                                                                                  
[07:38:46]Lendo os 20 blocos de efeito...                                                                                                                                                                                                                                                                                     
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 11 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 13 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 15 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 17 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 19 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 1B 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 1D 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 1F 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 21 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 23 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 25 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 27 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 29 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 2B 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:46]SysEx recebido — comando 12H, endereço 10 00 2D 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]SysEx recebido — comando 12H, endereço 10 00 2F 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]SysEx recebido — comando 12H, endereço 10 00 31 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]SysEx recebido — comando 12H, endereço 10 00 33 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]SysEx recebido — comando 12H, endereço 10 00 35 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]SysEx recebido — comando 12H, endereço 10 00 37 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:38:47]Tipos dos blocos: 0, 36, 29, 30, 31, 2, 32, 2, 32, 50, 4, 13, 62, 0, 0, 0, 0, 0, 0, 0                                                                                                                                                                                                                               
[07:38:47]Cadeia lida com sucesso.                                                                                                                                                                                                                                                                                            
```                                                                                                                                                                                                                                                                                                                           
																																																																															
tentei adicionar também um bloco no meio. Também não funcionou. Registros obtidos:                                                                                                                                                                                                                                            
```                                                                                                                                                                                                                                                                                                                           
[07:40:03]Usando o Fx Item 1 (id 0) para o efeito Acoustic Guitar Simulator.                                                                                                                                                                                                                                                  
[07:40:03]Gravando tipo (DT1 em 10 00 11 00): 00 01                                                                                                                                                                                                                                                                           
[07:40:03]Gravando a cadeia (DT1 em 10 00 0F 0C): 02 04 03 06 08 0A 07 01 09 05 0B 0C 0D 00 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 11 03, 16 byte(s)                                                                                                                                                                                                                                                      
[07:40:03]SysEx recebido — comando 12H, endereço 00 20 01 40, 241 byte(s)                                                                                                                                                                                                                                                     
[07:40:03]SysEx recebido — comando 12H, endereço 00 20 03 31, 8 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 00 20 00 40, 83 byte(s)                                                                                                                                                                                                                                                      
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:40:03]A PEDALEIRA NÃO ACEITOU 2 byte(s):                                                                                                                                                                                                                                                                                  
[07:40:03] NEXT ITEM0 (byte 1): enviei 4, pedaleira ficou com 0                                                                                                                                                                                                                                                               
[07:40:03] NEXT ITEM6 (byte 7): enviei 1, pedaleira ficou com 4                                                                                                                                                                                                                                                               
[07:40:03]Bloco adicionado. Relendo para conferir...                                                                                                                                                                                                                                                                          
[07:40:03]Pedindo a cadeia (RQ1 em 10 00 0F 0C, 50 bytes)...                                                                                                                                                                                                                                                                  
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 0F 0C, 50 byte(s)                                                                                                                                                                                                                                                      
[07:40:03]Cadeia crua: 02 00 03 06 08 0A 07 04 09 05 0B 0C 0D 00 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31                                                                                                                                                  
[07:40:03]Lendo os 20 blocos de efeito...                                                                                                                                                                                                                                                                                     
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 11 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 13 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 15 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 17 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 19 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:03]SysEx recebido — comando 12H, endereço 10 00 1B 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 1D 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 1F 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 21 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 23 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 25 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 27 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 29 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 2B 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 2D 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 2F 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 31 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 33 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 35 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 10 00 37 00, 3 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]Tipos dos blocos: 0, 36, 29, 30, 31, 2, 32, 2, 32, 50, 4, 13, 62, 0, 0, 0, 0, 0, 0, 0                                                                                                                                                                                                                               
[07:40:04]Cadeia lida com sucesso.                                                                                                                                                                                                                                                                                            
[07:40:04]SysEx recebido — comando 12H, endereço 00 20 01 40, 241 byte(s)                                                                                                                                                                                                                                                     
[07:40:04]SysEx recebido — comando 12H, endereço 00 20 03 31, 8 byte(s)                                                                                                                                                                                                                                                       
[07:40:04]SysEx recebido — comando 12H, endereço 00 20 00 40, 83 byte(s)                                                                                                                                                                                                                                                      
```                                                                                                                                                                                                                                                                                                                           
																																																																															
Tentei remover o primeiro bloco. Não funcionou. adicionar um bloco no início também não funcionou.  
--------------------------------------

Agora funcionou perfeitamente.                                                                                                                                                                                                                                                                                                
Mas ha um detalhe: os blocos Divider, Splitter e Mixer trabalham em conjunto como se fossem um único bloco, de modo que não faz sentido adicionar um deles.                                                                                                                                                                   
Desta forma, na lista de blocos disponíveis, em vez de três itens, deve ser apenas um item Div/Mix ou Divider/Mixer e quando o item for adicionado, deve-se adicionar os 3 blocos na ordem Divider > Splitter > Mixer. Quando o bloco for removido, então os 3 blocos devem ser removidos.                                    
																																																																															
Um outro detalhe é que a pedaleira não aceita acrescentar mais de um grupo divider/splitter/mixer.                                                                                                                                                                                                                            
																																																																															
Além disso, no test-002, acrescente também a funcionalidade de clicar e arrastar os itens da cadeia atual de modo que eu possa reordená-los.  
--------------------------------------

claude --resume 197ff339-3de8-4fc2-88da-22f54792cea4

O teste realizado funcionou muito bem. Blocos foram adicionados e removidos. Blocos foram movidos para alterar a ordenação. Tudo de acordo com o esperado até o momento. 

Agora temos que testar cada bloco individualmente. Para isso, crie uma nova página de testes `test-003-modulos.html`. Nesta página, exiba a lista dos blocos/modulos adicionados. Ao clicar em cada módulo da lista, deve-se abrir abaixo a lista de parâmetros e valores do módulo e controles html de modo que eu possa alterar os valores de cada parâmetro. Quanto aos controles para os parâmetros, se possível, use apenas controles do tipo range (<input type="range">) horizontal.
--------------------------------------

Comecei a fazer alguns testes na página `test-003-modulos.html`.

No módulo `AIRD Preamp`, no parâmetro `tipo de amplificador`, eu encontrei alguns problemas:

- Ao selecionar um valor na página outro valor foi selecionado no hardware (boss gx-10). Eis a lista dos valores que selecionei na página e os valores selecionados no hardware:

	[página]			=> [hardware]
	0 TRANSPARENT       => TRANSPARENT
	1 NATURAL           => NATURAL
	2 BOUTIQUE          => BOUTIQUE
	3 SUPREME           => SUPREME
	4 MAXIMUM           => MAXIMUM
	5 JUGGERNAUT        => JUGGERNAUT
	6 X-CRUNCH          => X-CRUNCH
	7 X-HI GAIN         => X-HI GAIN
	8 X-MODDED          => X-MODDED
	9 X-ULTRA           => JC-120
	10 X-OPTIMA         => TWIN COMBO
	11 X TITAN          => DELUXE COMBO
	12 JC-120           => TWEED COMBO
	13 TWIN COMBO       => DIAMOND AMP
	14 DELUXE COMBO     => BRIT STACK
	15 TWEED COMBO      => RECTI STACK
	16 DIAMOND AMP      => MATCH COMBO
	17 BRIT STACK       => BG COMBO
	18 RECTI STACK      => ORNG STACK
	19 MATCH COMBO      => BGNR UB METAL
	20 BG COMBO         => X-ULTRA
	21 ORNG STACK       => X-OPTIMA
	22 BGNR UB METAL    => X TITAN

- O parâmetro `Chave de ganho` na página alterou o parâmetro `BASS` no hardware. O correto seria alterar `GAIN SW` no hardware.

- O parãmetro `Graves` na página alterou o parâmetro `MIDDLE` no hardware. O correto seria alterar `BASS` no hardware.

- o parâmetro `Médios` na página alterou o parâmetro `TREBLE` no hardware. O correto seria alterar `MIDDLE` no hardware.

- 0 parâmetro `Agudos` na página alterou o parâmetro `PRESENCE` no hardware. O correto seria alterar `TREBLE` no hardware.

- O parâmetro `Presença` na página alterou o parâmetro `GAIN SW` no hardware. O correto seria alterar `PRESENCE` no hardware.

- O parâmetro `Brilho` na página alterou o parâmetro `SOLO SW` no hardware. O correto seria alterar `BRIGHT SW` no hardware.

- O parâmetro `Chave de solo` na página alterou o parâmetro `SOLO LEVEL` no hardware. O correto seria alterar `SOLO SW` no hardware.

- O parâmetro `Volume do solo` na página alterou o parâmetro `BRIGHT SW` no hardware. O correto seria alterar `SOLO LEVEL` no hardware.

- O parâmetro `Tipo de Gabinete` na página alterou o parâmetro `DIRECT MIX` no hardware. O correto seria alterar `SP TYPE` no hardware.

- O parâmetro `Som direto` na página alterou o parâmetro `SP TYPE` no hardware. O correto seria alterar `DIRECT MIX` no hardware.

- No parâmetro `Tipo de mic` na página, ao selecionar alguns valores na página são selecionados outros valores no hardware, tal como segue:
	[página] => [hardware]
	DYN57     => DYN57
	DYN421    => DYN421
	CND451    => CND451
	CND87     => CND87
	RBN121    => FLAT
	BLEND A   => RBN121
	BLEND B   => BLEND A
	BLEND C   => BLEND B
	FLAT      => BLEND C
	
Faça o ajuste necesários nos parâmetros do módulo.
--------------------------------------

Você disse "A ordem correta dos parâmetros do PREAMP é a da lista numerada do midi.pdf". É possível então que outros módulos tenham ocorrido o mesmo tipo de problema por ter priorizado a ordem da descrição em vez da ordem em midi.pdf? Verifique e se necessário faça as correções.
--------------------------------------

claude --resume 197ff339-3de8-4fc2-88da-22f54792cea4

Testei novamente e eis o que percebi neste novo teste:

- quando eu altero algum parâmetro na página agora aparece no hardware, por um ou dois segundos, a mensagem `DATA RECEIVING...` e então o valor novo é exibido no hardware. Antes esta mensagem não era exibida, e eu via no hardware o valor sendo alterado imediatamente no momento em que eu alterava na página. Se for possível, volte este comportamente de antes de não exibir esta mensagem `DATA RECEIVING ...` sempre que eu altero algum valor na página (como não tinha isso antes, creio que seja algo introduzido na última alteração do código).

- Em AIRD Preamp, no parâmetro `Tipo de amplificador`, os valores estão corretos agora, mas a ordem dos tipos está diferente da ordem no hardware. No hardware a ordem correta é: TRANSPARENT, NATURAL, BOUTIQUE, SUPREME, MAXIMUM, JUGGERNAUT, X-CRUNCH, X-HI GAIN, X-MODDED, X-ULTRA, X-OPTIMA, X-TITAN, JC-120, TWIN COMBO, DELUXE COMBO, TWEED COMBO, DIAMOND AMP, BRIT STACK, RECTI STACK, MATCH COMBO, BG COMBO, ORNG STACK, BGNR UB METAL. Os valores estão corretos, ou seja, o valor que seleciono na página é o valor que aparece no hardware, é só a ordem da listagem que está diferente.
	- De forma similar, no parâmetro `Tipo de mic` os valores estão corretos mas a ordem da listagem está diferente. No hardware a listagem segue a ordem: DYN57, DYN421, CND451, CND87, RBN121, BLEND A, BLEND B , BLEND C , FLAT. Isto também ocorre no módulo `AIRD Bass Preamp` no parâmetro `Tipo de Mic` (`mic type` no harware).
	
- No bloco `Foot Volume`:
	- o parâmetro `Posição do Pedal` na página está alterando `VOLUME MIN` no hardware.
	- o parâmetro `Volume com o pedal no calcanhar` na página está alterando `volume max` no hardware.
	- o parâmetro `volume com o pedal na ponta` na página está alterando `volume curve` no hardware.
	- o parâmetro `curva do pedal` na página está alterando `pedal position` no hardware.
	
- no bloco `Chorus`, o parâmetro `Atrazo` está incrementando os valores em 0.1 ms, mas no hardware os valores do parâmetro `pre delay` são incrementados em 0.5 ms. No hardware o valor máximo vai até 40.0 ms (que na página está correspondento à 0.8 ms).
	- o mesmo ocorre com o parâmetro `Atrazo 1` (na página) e `pre-delay 1` no hardware.
	- o mesmo ocorre com o parâmetro `Atrazo 2` (na página) e `pre-delay 2` no hardware.
	- no hardware o parâmetro `BPM` também é exibido em chorus. Este mesmo parâmetro é exibido também em outros módulos (delay, por exemplo), ou seja, é um parâmetro controlado por diversos módulos.

- no bloco `Delay` o parâmetro `Tempo do delay` está incompleto. Na página ele exibe/altera valores entre 1ms e 2000ms, mas no hardware, após o 2000ms há também os seguintes valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	- No bloco `delay`, acrescente também o parâmetro bpm.


- no bloco `Acoustic Guitar Simulator`
	- no parâmetro `Grave` os valores enviados são de 0 a 100, mas exibidos de -50 a 50, ou seja o valor midi 0 corresponde a low=-50, valor midi 50 corresponde a low=0, valor midi 100 corresponde a low=+50. Os valores que o hardware recebe são sempre positivos ou zero. Valores negativos somente em exibição, nunca enviados.
	- a mesma coisa acontece com o parâmetro `agudo` na página e `high` no hardware.

Faça os ajustes necessários.
Ainda não testei todos os blocos, mas a medida que o fizer indicarei os problemas encontrados.
	
--------------------------------------

Você disse: "1. "DATA RECEIVING..." — era o envio contínuo enquanto você arrastava, uma mensagem a cada 120 ms. Agora a página envia só quando você solta o controle, e nunca repete se o valor não mudou. Deixei uma caixinha "enviar enquanto arrasto" caso queira o comportamento contínuo.", na verdade eu prefiro que esta mensagem não apareça. E ela estava aparecendo sempre. Por enquanto deixe sempre sem esta mensagem, se aparecer alguma operação no futuro que exiga aparecer então eu direi.
--------------------------------------

Você também disse "Uma suspeita para você confirmar: se GRAVE e AGUDO funcionam assim, é bem provável que todos os parâmetros que o manual descreve como "-50 a +50" sejam iguais, por exemplo o TONE do compressor. Não mudei os outros porque seria chute em cima de 30 parâmetros. Se você testar um só e confirmar, eu ajusto todos de uma vez.". Alguns outros parâmetros tais como `tone`, em alguns módulos, também exibem de -50 a 50, mas está implementado corretamente. Até o momento somente estes de Acoustic Guitar Simulator é que percebi algum problema.
--------------------------------------

Ainda aparece a mensagem `DATA RECEIVING ...`, mesmo em uma mesnagem como ligar/desligar um módulo (alterar oparâmetro on/off). Se eu abrir o Boss Tone Studio junto, então a página não gera mais a mensagem quando altero um parâmetro. Mas se eu fechar o BOSS Tone Studio, então o hardware volta a exibir a mensagem quando altero qualquer valor. 

Um outro detalhe, o parâmetro bpm não aparece em todos os módulos, até o momento eu o vi apenas em chorus e delay. Na página creio que você o colocou em todos os módulos. 
--------------------------

A mensagem continua aparecendo. 
Abrei o Boss Tone Studio e eis as mensagens que apareceram no registro enquanto o app era aberto:
```
[18:34:28]← comando 12H, endereço 10 00 00 69, 20 byte(s): 05 05 05 00 00 00 00 00 00 00 00 00 ...
[18:34:29]← comando 12H, endereço 7F 00 00 00, 1 byte(s): 04
[18:34:29]← comando 12H, endereço 7F 00 00 01, 1 byte(s): 01
[18:34:29]← comando 12H, endereço 7F 00 00 03, 1 byte(s): 00
[18:34:29]← comando 12H, endereço 50 00 00 00, 128 byte(s): 46 65 6E 64 65 72 20 54 77 69 6E 20 ...
[18:34:29]← comando 12H, endereço 50 00 01 00, 128 byte(s): 56 6F 78 20 41 43 33 30 20 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 02 00, 128 byte(s): 53 4C 49 43 45 52 20 44 52 49 56 45 ...
[18:34:29]← comando 12H, endereço 50 00 03 00, 128 byte(s): 48 49 2D 47 41 49 4E 20 4C 45 41 44 ...
[18:34:29]← comando 12H, endereço 50 00 04 00, 128 byte(s): 46 55 53 49 4F 4E 20 53 4F 4C 4F 20 ...
[18:34:29]← comando 12H, endereço 50 00 05 00, 128 byte(s): 57 49 4E 44 57 41 52 44 20 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 06 00, 128 byte(s): 4E 45 57 20 41 47 45 44 20 42 4C 55 ...
[18:34:29]← comando 12H, endereço 50 00 07 00, 128 byte(s): 46 55 4E 4B 20 44 52 49 56 45 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 08 00, 128 byte(s): 46 55 5A 5A 59 20 44 49 53 54 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 09 00, 128 byte(s): 4C 4F 2D 46 49 20 43 4C 45 41 4E 20 ...
[18:34:29]← comando 12H, endereço 50 00 0A 00, 128 byte(s): 50 52 4F 47 20 4C 45 41 44 20 54 4F ...
[18:34:29]← comando 12H, endereço 50 00 0B 00, 128 byte(s): 53 54 55 44 49 4F 20 42 41 53 53 20 ...
[18:34:29]← comando 12H, endereço 50 00 0C 00, 128 byte(s): 4C 4F 4F 50 45 52 20 43 4C 45 41 4E ...
[18:34:29]← comando 12H, endereço 50 00 0D 00, 128 byte(s): 43 52 55 4E 43 48 20 4C 45 41 44 20 ...
[18:34:29]← comando 12H, endereço 50 00 0E 00, 128 byte(s): 58 2D 4F 50 54 49 4D 41 20 53 44 2D ...
[18:34:29]← comando 12H, endereço 50 00 0F 00, 128 byte(s): 50 48 41 53 45 52 20 43 4C 45 41 4E ...
[18:34:29]← comando 12H, endereço 50 00 10 00, 128 byte(s): 42 41 53 49 43 20 47 49 47 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 11 00, 128 byte(s): 46 55 5A 5A 20 53 4F 4C 4F 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 12 00, 128 byte(s): 47 49 54 41 52 52 45 20 53 50 49 45 ...
[18:34:29]← comando 12H, endereço 50 00 13 00, 128 byte(s): 41 4D 45 52 49 43 41 4E 41 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 14 00, 128 byte(s): 41 4D 42 49 45 4E 54 20 4C 45 41 44 ...
[18:34:29]← comando 12H, endereço 50 00 15 00, 128 byte(s): 44 52 59 20 43 52 55 4E 43 48 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 16 00, 128 byte(s): 42 4C 55 45 20 4C 41 4B 45 20 20 20 ...
[18:34:29]← comando 12H, endereço 50 00 17 00, 128 byte(s): 45 58 50 45 4E 53 49 56 45 20 54 41 ...
[18:34:30]← comando 12H, endereço 50 00 18 00, 128 byte(s): 4D 4F 4E 4F 20 42 41 53 53 20 43 4C ...
[18:34:30]← comando 12H, endereço 50 00 19 00, 128 byte(s): 47 58 20 44 55 41 4C 20 44 52 49 56 ...
[18:34:30]← comando 12H, endereço 50 00 1A 00, 128 byte(s): 4D 4F 44 45 52 4E 20 44 53 20 20 20 ...
[18:34:30]← comando 12H, endereço 50 00 1B 00, 128 byte(s): 53 4C 49 43 45 52 20 44 52 49 56 45 ...
[18:34:30]← comando 12H, endereço 50 00 1C 00, 128 byte(s): 48 49 2D 47 41 49 4E 20 4C 45 41 44 ...
[18:34:30]← comando 12H, endereço 50 00 1D 00, 128 byte(s): 46 55 53 49 4F 4E 20 53 4F 4C 4F 20 ...
[18:34:30]← comando 12H, endereço 50 00 1E 00, 128 byte(s): 57 49 4E 44 57 41 52 44 20 20 20 20 ...
[18:34:30]← comando 12H, endereço 50 00 1F 00, 128 byte(s): 4E 45 57 20 41 47 45 44 20 42 4C 55 ...
[18:34:30]← comando 12H, endereço 50 00 20 00, 128 byte(s): 46 55 4E 4B 20 44 52 49 56 45 20 20 ...
[18:34:30]← comando 12H, endereço 50 00 21 00, 128 byte(s): 46 55 5A 5A 59 20 44 49 53 54 20 20 ...
[18:34:30]← comando 12H, endereço 50 00 22 00, 128 byte(s): 4C 4F 2D 46 49 20 43 4C 45 41 4E 20 ...
[18:34:30]← comando 12H, endereço 50 00 23 00, 128 byte(s): 50 52 4F 47 20 4C 45 41 44 20 54 4F ...
[18:34:30]← comando 12H, endereço 50 00 24 00, 128 byte(s): 53 54 55 44 49 4F 20 42 41 53 53 20 ...
[18:34:30]← comando 12H, endereço 50 00 25 00, 64 byte(s): 4C 4F 4F 50 45 52 20 43 4C 45 41 4E ...
[18:34:30]← comando 12H, endereço 60 40 00 00, 12 byte(s): 4A 65 6E 73 65 6E 50 31 32 52 20 20
[18:34:30]← comando 12H, endereço 60 41 00 00, 12 byte(s): 47 72 20 31 2E 30 20 6F 66 66 20 20
[18:34:30]← comando 12H, endereço 60 42 00 00, 12 byte(s): 47 72 20 31 2E 30 20 6F 6E 20 20 20
[18:34:30]← comando 12H, endereço 60 43 00 00, 12 byte(s): 47 72 20 32 2E 30 20 6F 66 66 20 20
[18:34:30]← comando 12H, endereço 60 44 00 00, 12 byte(s): 47 72 20 32 2E 30 20 6F 6E 20 20 20
[18:34:30]← comando 12H, endereço 60 45 00 00, 12 byte(s): 56 33 30 20 30 2E 30 20 6F 66 66 20
[18:34:30]← comando 12H, endereço 60 46 00 00, 12 byte(s): 56 33 30 20 30 2E 30 20 6F 6E 20 20
[18:34:30]← comando 12H, endereço 60 47 00 00, 12 byte(s): 56 33 30 20 31 2E 30 20 6F 66 66 20
[18:34:30]← comando 12H, endereço 60 48 00 00, 12 byte(s): 56 33 30 20 31 2E 30 20 6F 6E 20 20
[18:34:30]← comando 12H, endereço 60 49 00 00, 12 byte(s): 56 33 30 20 32 2E 30 20 6F 66 66 20
[18:34:31]← comando 12H, endereço 60 4A 00 00, 12 byte(s): 56 33 30 20 32 2E 30 20 6F 6E 20 20
[18:34:31]← comando 12H, endereço 60 4B 00 00, 12 byte(s): 55 53 45 52 20 31 32 20 20 20 20 20
[18:34:31]← comando 12H, endereço 60 4C 00 00, 12 byte(s): 55 53 45 52 20 31 33 20 20 20 20 20
[18:34:31]← comando 12H, endereço 60 4D 00 00, 12 byte(s): 55 53 45 52 20 31 34 20 20 20 20 20
[18:34:31]← comando 12H, endereço 60 4E 00 00, 12 byte(s): 55 53 45 52 20 31 35 20 20 20 20 20
[18:34:31]← comando 12H, endereço 60 4F 00 00, 12 byte(s): 55 53 45 52 20 31 36 20 20 20 20 20
[18:34:31]← comando 12H, endereço 00 00 00 00, 45 byte(s): 00 00 00 0C 02 00 00 01 00 00 4A 00 ...
[18:34:31]← comando 12H, endereço 00 00 10 00, 102 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[18:34:31]← comando 12H, endereço 00 00 30 00, 21 byte(s): 00 00 10 01 00 00 00 01 00 00 00 00 ...
[18:34:31]← comando 12H, endereço 00 00 40 00, 13 byte(s): 00 00 00 06 04 06 04 06 04 06 04 00 ...
[18:34:31]← comando 12H, endereço 00 00 50 00, 2 byte(s): 00 00
[18:34:31]← comando 12H, endereço 00 00 60 00, 7 byte(s): 00 01 0B 08 00 10 00
[18:34:31]← comando 12H, endereço 00 10 00 00, 128 byte(s): 00 00 00 00 00 00 00 01 00 00 00 02 ...
[18:34:31]← comando 12H, endereço 00 10 01 00, 128 byte(s): 00 00 02 00 00 00 02 01 00 00 02 02 ...
[18:34:31]← comando 12H, endereço 00 10 02 00, 128 byte(s): 00 00 04 00 00 00 04 01 00 00 04 02 ...
[18:34:31]← comando 12H, endereço 00 10 03 00, 128 byte(s): 00 00 06 00 00 00 06 01 00 00 06 02 ...
[18:34:31]← comando 12H, endereço 00 10 04 00, 128 byte(s): 00 00 06 03 00 00 06 04 00 00 06 05 ...
[18:34:31]← comando 12H, endereço 00 10 05 00, 128 byte(s): 00 00 08 03 00 00 08 04 00 00 08 05 ...
[18:34:31]← comando 12H, endereço 00 10 06 00, 128 byte(s): 00 00 0A 03 00 00 0A 04 00 00 0A 05 ...
[18:34:31]← comando 12H, endereço 00 10 07 00, 128 byte(s): 00 00 0C 03 00 00 0C 04 00 00 0C 05 ...
[18:34:31]← comando 12H, endereço 00 10 08 00, 128 byte(s): 00 00 0C 08 00 00 0C 09 00 00 0C 0A ...
[18:34:31]← comando 12H, endereço 00 10 09 00, 128 byte(s): 00 00 0E 08 00 00 0E 09 00 00 0E 0A ...
[18:34:31]← comando 12H, endereço 00 10 0A 00, 128 byte(s): 00 01 00 08 00 01 00 09 00 01 00 0A ...
[18:34:31]← comando 12H, endereço 00 10 0B 00, 128 byte(s): 00 01 02 08 00 01 02 09 00 01 02 0A ...
[18:34:31]← comando 12H, endereço 00 20 00 00, 9 byte(s): 00 00 00 00 00 00 01 00 00
[18:34:31]← comando 12H, endereço 00 20 00 40, 111 byte(s): 01 01 01 01 01 01 01 01 01 01 01 01 ...
[18:34:31]← comando 12H, endereço 00 20 01 40, 128 byte(s): 03 03 03 03 03 03 03 03 03 03 03 03 ...
[18:34:32]← comando 12H, endereço 00 20 02 40, 121 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[18:34:32]← comando 12H, endereço 00 20 03 40, 18 byte(s): 01 00 20 20 20 0E 01 20 17 01 20 00 ...
[18:34:32]← comando 12H, endereço 00 00 61 00, 18 byte(s): 49 4E 49 54 20 30 31 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 62 00, 18 byte(s): 49 4E 49 54 20 30 32 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 63 00, 18 byte(s): 49 4E 49 54 20 30 33 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 64 00, 18 byte(s): 49 4E 49 54 20 30 34 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 65 00, 18 byte(s): 49 4E 49 54 20 30 35 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 66 00, 18 byte(s): 49 4E 49 54 20 30 36 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 67 00, 18 byte(s): 49 4E 49 54 20 30 37 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 68 00, 18 byte(s): 49 4E 49 54 20 30 38 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 69 00, 18 byte(s): 49 4E 49 54 20 30 39 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 6A 00, 18 byte(s): 49 4E 49 54 20 31 30 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 00 00 6B 00, 27 byte(s): 49 4E 49 54 20 30 31 20 20 20 20 20 ...
[18:34:32]← comando 12H, endereço 7F 00 00 02, 1 byte(s): 00
[18:34:32]← comando 12H, endereço 00 20 00 06, 1 byte(s): 01
[18:34:32]← comando 12H, endereço 00 20 00 07, 1 byte(s): 00
[18:34:32]← comando 12H, endereço 00 20 00 08, 1 byte(s): 00
[18:34:32]← comando 12H, endereço 00 00 10 34, 1 byte(s): 01
[18:34:32]← comando 12H, endereço 00 00 00 00, 4 byte(s): 00 00 00 0C
[18:34:32]← comando 12H, endereço 10 00 00 00, 16 byte(s): 20 20 20 20 20 20 20 20 20 20 20 20 ...
[18:34:33]← comando 12H, endereço 7F 00 07 03, 1 byte(s): 01
[18:34:33]← comando 12H, endereço 10 00 11 00, 131 byte(s): 00 01 00 08 00 04 0A 08 00 03 02 08 ...
[18:34:33]← comando 12H, endereço 10 00 13 00, 131 byte(s): 01 01 00 08 00 00 00 08 00 03 02 08 ...
[18:34:33]← comando 12H, endereço 10 00 15 00, 131 byte(s): 1D 01 00 08 00 00 00 08 00 00 01 08 ...
[18:34:33]← comando 12H, endereço 10 00 17 00, 131 byte(s): 1E 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 18 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[18:34:33]← comando 12H, endereço 10 00 19 00, 131 byte(s): 1F 00 00 08 00 00 00 08 00 05 0D 08 ...
[18:34:33]← comando 12H, endereço 10 00 1B 00, 131 byte(s): 02 00 01 08 00 00 01 08 00 06 0A 08 ...
[18:34:33]← comando 12H, endereço 10 00 1D 00, 131 byte(s): 20 01 01 08 00 01 0A 08 00 02 06 08 ...
[18:34:33]← comando 12H, endereço 10 00 1F 00, 131 byte(s): 02 01 02 08 00 00 07 08 00 03 02 08 ...
[18:34:33]← comando 12H, endereço 10 00 21 00, 131 byte(s): 20 01 02 08 00 01 0E 08 00 01 0E 08 ...
[18:34:33]← comando 12H, endereço 10 00 23 00, 131 byte(s): 32 01 00 08 00 00 07 08 00 05 08 08 ...
[18:34:33]← comando 12H, endereço 10 00 25 00, 131 byte(s): 04 00 00 08 00 00 03 08 00 05 0B 08 ...
[18:34:33]← comando 12H, endereço 10 00 26 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[18:34:33]← comando 12H, endereço 10 00 27 00, 131 byte(s): 0D 00 00 08 07 0D 00 08 00 03 07 08 ...
[18:34:33]← comando 12H, endereço 10 00 28 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[18:34:33]← comando 12H, endereço 10 00 29 00, 131 byte(s): 3E 01 00 08 00 00 01 08 00 01 0E 08 ...
[18:34:33]← comando 12H, endereço 10 00 2B 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 2D 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 2F 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 31 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 33 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 35 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 37 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[18:34:33]← comando 12H, endereço 10 00 0F 00, 62 byte(s): 06 04 00 04 0E 02 00 00 00 01 00 32 ...
[18:34:33]← comando 12H, endereço 10 00 00 69, 20 byte(s): 05 05 05 00 00 00 00 00 00 00 00 00 ...
[18:34:33]← comando 12H, endereço 10 00 00 00, 128 byte(s): 20 20 20 20 20 20 20 20 20 20 20 20 ...
[18:34:33]← comando 12H, endereço 10 00 01 00, 1 byte(s): 00
[18:34:34]← comando 12H, endereço 10 00 01 40, 28 byte(s): 00 0B 00 0B 00 0B 00 0B 00 0B 00 0B ...
[18:34:34]← comando 12H, endereço 10 00 02 00, 45 byte(s): 00 01 00 00 00 00 00 00 00 00 0F 0F ...
[18:34:34]← comando 12H, endereço 10 00 02 40, 45 byte(s): 00 0A 00 00 00 00 00 00 00 00 0F 0F ...
[18:34:34]← comando 12H, endereço 10 00 03 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 03 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 04 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 04 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 05 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 05 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 06 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 06 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 07 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 07 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 08 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 08 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 09 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 09 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 0A 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 0A 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 0B 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[18:34:34]← comando 12H, endereço 10 00 0B 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
```
--------------------------




Não funcionou:
```
[18:40:12]Ligando modo editor (DT1 7F 00 07 03: 1)
[18:40:13] não consegui reler o sinalizador: A pedaleira não respondeu em 1500 ms (endereço 7f 00 07 03).
```

Após isso, liguei o módulo Acoustic Resonance:
```
[18:40:17]ON/OFF = OFF (DT1 10 00 13 01: 00)
```

A mensagem `DATA RECEIVING ...` apareceu.
--------------------------------------

Clicar em listar portas MIDI, resultou em: 
```
[18:49:42]Página pronta. Conecte a pedaleira para começar.
[18:49:55]Entradas MIDI (2):
[18:49:55] GX-10 [Microsoft Corporation] · connected
[18:49:55] GX-10 DAW CTRL [Microsoft Corporation] · connected
[18:49:55]Saídas MIDI (2):
[18:49:55] GX-10 [Microsoft Corporation] · connected
[18:49:55] GX-10 DAW CTRL [Microsoft Corporation] · connected
[18:49:55]Há mais de uma saída: vale testar a segunda, pois algumas pedaleiras tratam cada porta de um jeito.
```

As entradas e saídas aparecem com as opções `GX-10` e `GX-10 DAW CTRL`.

Testei todas as combinações das portas de entrada e saída. A mensagem continua sendo exibida. 
--------------------------------------
Testei da seguinte forma:
BTS fechado, abri meu app, cliquei em conectar, marquei `registrar tudo que a pedaleira envia`, cliquei em retrato do estado, obtive o seguinte:
```
[19:01:39]Página pronta. Conecte a pedaleira para começar.
[19:01:54]Conectado com sucesso ao dispositivo: GX-10
[19:02:56]=== RETRATO DO ESTADO — 19:02:56 ===
[19:02:56]← comando 12H, endereço 00 00 00 00, 45 byte(s): 00 00 00 0C 02 00 00 01 00 00 4A 00 ...
[19:02:56]00 00 00 00 (SystemCommon): 00 00 00 0C 02 00 00 01 00 00 4A 00 00 01 01 04 01 00 01 01 00 00 00 00 01 00 62 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 02 0B 05
[19:02:56]← comando 12H, endereço 00 00 10 00, 102 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[19:02:56]00 00 10 00 (SystemControl): 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 03 01 01 01 01 00 00 00 00 00 00 08 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 01 01
[19:02:56]← comando 12H, endereço 00 00 30 00, 21 byte(s): 00 00 10 01 00 00 00 01 00 00 00 00 ...
[19:02:56]00 00 30 00 (SystemMidi): 00 00 10 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00
[19:02:56]← comando 12H, endereço 00 00 40 00, 13 byte(s): 00 00 00 06 04 06 04 06 04 06 04 00 ...
[19:02:56]00 00 40 00 (SystemInOut): 00 00 00 06 04 06 04 06 04 06 04 00 00
[19:02:56]← comando 12H, endereço 00 00 50 00, 2 byte(s): 00 00
[19:02:56]00 00 50 00 (SystemEfct): 00 00
[19:02:56]← comando 12H, endereço 00 00 60 00, 7 byte(s): 00 01 0B 08 00 10 00
[19:02:56]00 00 60 00 (SystemPitch): 00 01 0B 08 00 10 00
[19:02:57]← comando 12H, endereço 00 20 00 00, 9 byte(s): 00 00 00 00 00 00 01 00 00
[19:02:57]00 20 00 00 (00 20 00 00 (não documentada)): 00 00 00 00 00 00 01 00 00
[19:02:57]← comando 12H, endereço 00 20 03 40, 18 byte(s): 01 00 20 20 20 0E 01 20 17 01 20 00 ...
[19:02:57]00 20 03 40 (00 20 03 40 (não documentada)): 01 00 20 20 20 0E 01 20 17 01 20 00 1D 20 00 04 0E 02
[19:02:57]=== fim do retrato ===
```

Abri o BTS. A pedeleira enviou o seguinte durante a carga do BTS:
```
[19:03:36]← comando 12H, endereço 10 00 00 69, 20 byte(s): 05 05 05 00 00 00 00 00 00 00 00 00 ...
[19:03:36]← comando 12H, endereço 7F 00 00 00, 1 byte(s): 04
[19:03:36]← comando 12H, endereço 7F 00 00 01, 1 byte(s): 01
[19:03:36]← comando 12H, endereço 7F 00 00 03, 1 byte(s): 00
[19:03:36]← comando 12H, endereço 50 00 00 00, 128 byte(s): 46 65 6E 64 65 72 20 54 77 69 6E 20 ...
[19:03:36]← comando 12H, endereço 50 00 01 00, 128 byte(s): 56 6F 78 20 41 43 33 30 20 20 20 20 ...
[19:03:36]← comando 12H, endereço 50 00 02 00, 128 byte(s): 53 4C 49 43 45 52 20 44 52 49 56 45 ...
[19:03:36]← comando 12H, endereço 50 00 03 00, 128 byte(s): 48 49 2D 47 41 49 4E 20 4C 45 41 44 ...
[19:03:36]← comando 12H, endereço 50 00 04 00, 128 byte(s): 46 55 53 49 4F 4E 20 53 4F 4C 4F 20 ...
[19:03:36]← comando 12H, endereço 50 00 05 00, 128 byte(s): 57 49 4E 44 57 41 52 44 20 20 20 20 ...
[19:03:36]← comando 12H, endereço 50 00 06 00, 128 byte(s): 4E 45 57 20 41 47 45 44 20 42 4C 55 ...
[19:03:36]← comando 12H, endereço 50 00 07 00, 128 byte(s): 46 55 4E 4B 20 44 52 49 56 45 20 20 ...
[19:03:36]← comando 12H, endereço 50 00 08 00, 128 byte(s): 46 55 5A 5A 59 20 44 49 53 54 20 20 ...
[19:03:36]← comando 12H, endereço 50 00 09 00, 128 byte(s): 4C 4F 2D 46 49 20 43 4C 45 41 4E 20 ...
[19:03:36]← comando 12H, endereço 50 00 0A 00, 128 byte(s): 50 52 4F 47 20 4C 45 41 44 20 54 4F ...
[19:03:36]← comando 12H, endereço 50 00 0B 00, 128 byte(s): 53 54 55 44 49 4F 20 42 41 53 53 20 ...
[19:03:36]← comando 12H, endereço 50 00 0C 00, 128 byte(s): 4C 4F 4F 50 45 52 20 43 4C 45 41 4E ...
[19:03:36]← comando 12H, endereço 50 00 0D 00, 128 byte(s): 43 52 55 4E 43 48 20 4C 45 41 44 20 ...
[19:03:36]← comando 12H, endereço 50 00 0E 00, 128 byte(s): 58 2D 4F 50 54 49 4D 41 20 53 44 2D ...
[19:03:36]← comando 12H, endereço 50 00 0F 00, 128 byte(s): 50 48 41 53 45 52 20 43 4C 45 41 4E ...
[19:03:36]← comando 12H, endereço 50 00 10 00, 128 byte(s): 42 41 53 49 43 20 47 49 47 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 11 00, 128 byte(s): 46 55 5A 5A 20 53 4F 4C 4F 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 12 00, 128 byte(s): 47 49 54 41 52 52 45 20 53 50 49 45 ...
[19:03:37]← comando 12H, endereço 50 00 13 00, 128 byte(s): 41 4D 45 52 49 43 41 4E 41 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 14 00, 128 byte(s): 41 4D 42 49 45 4E 54 20 4C 45 41 44 ...
[19:03:37]← comando 12H, endereço 50 00 15 00, 128 byte(s): 44 52 59 20 43 52 55 4E 43 48 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 16 00, 128 byte(s): 42 4C 55 45 20 4C 41 4B 45 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 17 00, 128 byte(s): 45 58 50 45 4E 53 49 56 45 20 54 41 ...
[19:03:37]← comando 12H, endereço 50 00 18 00, 128 byte(s): 4D 4F 4E 4F 20 42 41 53 53 20 43 4C ...
[19:03:37]← comando 12H, endereço 50 00 19 00, 128 byte(s): 47 58 20 44 55 41 4C 20 44 52 49 56 ...
[19:03:37]← comando 12H, endereço 50 00 1A 00, 128 byte(s): 4D 4F 44 45 52 4E 20 44 53 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 1B 00, 128 byte(s): 53 4C 49 43 45 52 20 44 52 49 56 45 ...
[19:03:37]← comando 12H, endereço 50 00 1C 00, 128 byte(s): 48 49 2D 47 41 49 4E 20 4C 45 41 44 ...
[19:03:37]← comando 12H, endereço 50 00 1D 00, 128 byte(s): 46 55 53 49 4F 4E 20 53 4F 4C 4F 20 ...
[19:03:37]← comando 12H, endereço 50 00 1E 00, 128 byte(s): 57 49 4E 44 57 41 52 44 20 20 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 1F 00, 128 byte(s): 4E 45 57 20 41 47 45 44 20 42 4C 55 ...
[19:03:37]← comando 12H, endereço 50 00 20 00, 128 byte(s): 46 55 4E 4B 20 44 52 49 56 45 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 21 00, 128 byte(s): 46 55 5A 5A 59 20 44 49 53 54 20 20 ...
[19:03:37]← comando 12H, endereço 50 00 22 00, 128 byte(s): 4C 4F 2D 46 49 20 43 4C 45 41 4E 20 ...
[19:03:37]← comando 12H, endereço 50 00 23 00, 128 byte(s): 50 52 4F 47 20 4C 45 41 44 20 54 4F ...
[19:03:37]← comando 12H, endereço 50 00 24 00, 128 byte(s): 53 54 55 44 49 4F 20 42 41 53 53 20 ...
[19:03:37]← comando 12H, endereço 50 00 25 00, 64 byte(s): 4C 4F 4F 50 45 52 20 43 4C 45 41 4E ...
[19:03:37]← comando 12H, endereço 60 40 00 00, 12 byte(s): 4A 65 6E 73 65 6E 50 31 32 52 20 20
[19:03:37]← comando 12H, endereço 60 41 00 00, 12 byte(s): 47 72 20 31 2E 30 20 6F 66 66 20 20
[19:03:38]← comando 12H, endereço 60 42 00 00, 12 byte(s): 47 72 20 31 2E 30 20 6F 6E 20 20 20
[19:03:38]← comando 12H, endereço 60 43 00 00, 12 byte(s): 47 72 20 32 2E 30 20 6F 66 66 20 20
[19:03:38]← comando 12H, endereço 60 44 00 00, 12 byte(s): 47 72 20 32 2E 30 20 6F 6E 20 20 20
[19:03:38]← comando 12H, endereço 60 45 00 00, 12 byte(s): 56 33 30 20 30 2E 30 20 6F 66 66 20
[19:03:38]← comando 12H, endereço 60 46 00 00, 12 byte(s): 56 33 30 20 30 2E 30 20 6F 6E 20 20
[19:03:38]← comando 12H, endereço 60 47 00 00, 12 byte(s): 56 33 30 20 31 2E 30 20 6F 66 66 20
[19:03:38]← comando 12H, endereço 60 48 00 00, 12 byte(s): 56 33 30 20 31 2E 30 20 6F 6E 20 20
[19:03:38]← comando 12H, endereço 60 49 00 00, 12 byte(s): 56 33 30 20 32 2E 30 20 6F 66 66 20
[19:03:38]← comando 12H, endereço 60 4A 00 00, 12 byte(s): 56 33 30 20 32 2E 30 20 6F 6E 20 20
[19:03:38]← comando 12H, endereço 60 4B 00 00, 12 byte(s): 55 53 45 52 20 31 32 20 20 20 20 20
[19:03:38]← comando 12H, endereço 60 4C 00 00, 12 byte(s): 55 53 45 52 20 31 33 20 20 20 20 20
[19:03:38]← comando 12H, endereço 60 4D 00 00, 12 byte(s): 55 53 45 52 20 31 34 20 20 20 20 20
[19:03:38]← comando 12H, endereço 60 4E 00 00, 12 byte(s): 55 53 45 52 20 31 35 20 20 20 20 20
[19:03:38]← comando 12H, endereço 60 4F 00 00, 12 byte(s): 55 53 45 52 20 31 36 20 20 20 20 20
[19:03:38]← comando 12H, endereço 00 00 00 00, 45 byte(s): 00 00 00 0C 02 00 00 01 00 00 4A 00 ...
[19:03:38]← comando 12H, endereço 00 00 10 00, 102 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[19:03:38]← comando 12H, endereço 00 00 30 00, 21 byte(s): 00 00 10 01 00 00 00 01 00 00 00 00 ...
[19:03:38]← comando 12H, endereço 00 00 40 00, 13 byte(s): 00 00 00 06 04 06 04 06 04 06 04 00 ...
[19:03:38]← comando 12H, endereço 00 00 50 00, 2 byte(s): 00 00
[19:03:38]← comando 12H, endereço 00 00 60 00, 7 byte(s): 00 01 0B 08 00 10 00
[19:03:38]← comando 12H, endereço 00 10 00 00, 128 byte(s): 00 00 00 00 00 00 00 01 00 00 00 02 ...
[19:03:38]← comando 12H, endereço 00 10 01 00, 128 byte(s): 00 00 02 00 00 00 02 01 00 00 02 02 ...
[19:03:38]← comando 12H, endereço 00 10 02 00, 128 byte(s): 00 00 04 00 00 00 04 01 00 00 04 02 ...
[19:03:38]← comando 12H, endereço 00 10 03 00, 128 byte(s): 00 00 06 00 00 00 06 01 00 00 06 02 ...
[19:03:38]← comando 12H, endereço 00 10 04 00, 128 byte(s): 00 00 06 03 00 00 06 04 00 00 06 05 ...
[19:03:38]← comando 12H, endereço 00 10 05 00, 128 byte(s): 00 00 08 03 00 00 08 04 00 00 08 05 ...
[19:03:38]← comando 12H, endereço 00 10 06 00, 128 byte(s): 00 00 0A 03 00 00 0A 04 00 00 0A 05 ...
[19:03:38]← comando 12H, endereço 00 10 07 00, 128 byte(s): 00 00 0C 03 00 00 0C 04 00 00 0C 05 ...
[19:03:39]← comando 12H, endereço 00 10 08 00, 128 byte(s): 00 00 0C 08 00 00 0C 09 00 00 0C 0A ...
[19:03:39]← comando 12H, endereço 00 10 09 00, 128 byte(s): 00 00 0E 08 00 00 0E 09 00 00 0E 0A ...
[19:03:39]← comando 12H, endereço 00 10 0A 00, 128 byte(s): 00 01 00 08 00 01 00 09 00 01 00 0A ...
[19:03:39]← comando 12H, endereço 00 10 0B 00, 128 byte(s): 00 01 02 08 00 01 02 09 00 01 02 0A ...
[19:03:39]← comando 12H, endereço 00 20 00 00, 9 byte(s): 00 00 00 00 00 00 01 00 00
[19:03:39]← comando 12H, endereço 00 20 00 40, 111 byte(s): 01 01 01 01 01 01 01 01 01 01 01 01 ...
[19:03:39]← comando 12H, endereço 00 20 01 40, 128 byte(s): 01 01 01 01 01 01 01 01 01 01 01 01 ...
[19:03:39]← comando 12H, endereço 00 20 02 40, 121 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[19:03:39]← comando 12H, endereço 00 20 03 40, 18 byte(s): 01 00 20 20 20 0E 01 20 17 01 20 00 ...
[19:03:39]← comando 12H, endereço 00 00 61 00, 18 byte(s): 49 4E 49 54 20 30 31 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 62 00, 18 byte(s): 49 4E 49 54 20 30 32 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 63 00, 18 byte(s): 49 4E 49 54 20 30 33 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 64 00, 18 byte(s): 49 4E 49 54 20 30 34 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 65 00, 18 byte(s): 49 4E 49 54 20 30 35 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 66 00, 18 byte(s): 49 4E 49 54 20 30 36 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 67 00, 18 byte(s): 49 4E 49 54 20 30 37 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 68 00, 18 byte(s): 49 4E 49 54 20 30 38 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 69 00, 18 byte(s): 49 4E 49 54 20 30 39 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 6A 00, 18 byte(s): 49 4E 49 54 20 31 30 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 00 00 6B 00, 27 byte(s): 49 4E 49 54 20 30 31 20 20 20 20 20 ...
[19:03:39]← comando 12H, endereço 7F 00 00 02, 1 byte(s): 00
[19:03:39]← comando 12H, endereço 00 20 00 06, 1 byte(s): 01
[19:03:39]← comando 12H, endereço 00 20 00 07, 1 byte(s): 00
[19:03:39]← comando 12H, endereço 00 20 00 08, 1 byte(s): 00
[19:03:39]← comando 12H, endereço 00 00 10 34, 1 byte(s): 01
[19:03:39]← comando 12H, endereço 00 00 00 00, 4 byte(s): 00 00 00 0C
[19:03:39]← comando 12H, endereço 10 00 00 00, 16 byte(s): 20 20 20 20 20 20 20 20 20 20 20 20 ...
[19:03:40]← comando 12H, endereço 7F 00 07 03, 1 byte(s): 01
[19:03:40]← comando 12H, endereço 10 00 11 00, 131 byte(s): 00 00 00 08 00 02 05 08 00 03 02 08 ...
[19:03:40]← comando 12H, endereço 10 00 13 00, 131 byte(s): 01 01 00 08 00 00 00 08 00 03 02 08 ...
[19:03:40]← comando 12H, endereço 10 00 15 00, 131 byte(s): 02 01 00 08 00 00 01 08 00 03 02 08 ...
[19:03:40]← comando 12H, endereço 10 00 17 00, 131 byte(s): 1E 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:40]← comando 12H, endereço 10 00 18 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[19:03:40]← comando 12H, endereço 10 00 19 00, 131 byte(s): 1F 00 00 08 00 00 00 08 00 05 0D 08 ...
[19:03:40]← comando 12H, endereço 10 00 1B 00, 131 byte(s): 02 00 01 08 00 00 01 08 00 06 0A 08 ...
[19:03:40]← comando 12H, endereço 10 00 1D 00, 131 byte(s): 20 01 01 08 00 01 0A 08 00 02 06 08 ...
[19:03:40]← comando 12H, endereço 10 00 1F 00, 131 byte(s): 02 01 02 08 00 00 07 08 00 03 02 08 ...
[19:03:40]← comando 12H, endereço 10 00 21 00, 131 byte(s): 20 01 02 08 00 01 0E 08 00 01 0E 08 ...
[19:03:40]← comando 12H, endereço 10 00 23 00, 131 byte(s): 32 01 00 08 00 00 07 08 00 05 08 08 ...
[19:03:40]← comando 12H, endereço 10 00 25 00, 131 byte(s): 04 00 00 08 00 00 03 08 00 05 0B 08 ...
[19:03:40]← comando 12H, endereço 10 00 26 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[19:03:40]← comando 12H, endereço 10 00 27 00, 131 byte(s): 0D 00 00 08 07 0D 00 08 00 03 07 08 ...
[19:03:40]← comando 12H, endereço 10 00 28 03, 48 byte(s): 08 00 00 00 08 00 00 00 08 00 00 00 ...
[19:03:40]← comando 12H, endereço 10 00 29 00, 131 byte(s): 3E 01 00 08 00 00 01 08 00 01 0E 08 ...
[19:03:40]← comando 12H, endereço 10 00 2B 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:40]← comando 12H, endereço 10 00 2D 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:40]← comando 12H, endereço 10 00 2F 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:40]← comando 12H, endereço 10 00 31 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:41]← comando 12H, endereço 10 00 33 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:41]← comando 12H, endereço 10 00 35 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:41]← comando 12H, endereço 10 00 37 00, 131 byte(s): 00 00 00 08 00 00 00 08 00 00 00 08 ...
[19:03:41]← comando 12H, endereço 10 00 0F 00, 62 byte(s): 06 04 00 04 0E 02 00 00 00 01 00 32 ...
[19:03:41]← comando 12H, endereço 10 00 00 69, 20 byte(s): 05 05 05 00 00 00 00 00 00 00 00 00 ...
[19:03:41]← comando 12H, endereço 10 00 00 00, 128 byte(s): 20 20 20 20 20 20 20 20 20 20 20 20 ...
[19:03:41]← comando 12H, endereço 10 00 01 00, 1 byte(s): 00
[19:03:41]← comando 12H, endereço 10 00 01 40, 28 byte(s): 00 0B 00 0B 00 0B 00 0B 00 0B 00 0B ...
[19:03:41]← comando 12H, endereço 10 00 02 00, 45 byte(s): 00 01 00 00 00 00 00 00 00 00 0F 0F ...
[19:03:41]← comando 12H, endereço 10 00 02 40, 45 byte(s): 00 0A 00 00 00 00 00 00 00 00 0F 0F ...
[19:03:41]← comando 12H, endereço 10 00 03 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 03 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 04 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 04 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 05 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 05 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 06 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 06 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 07 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 07 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 08 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:41]← comando 12H, endereço 10 00 08 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 09 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 09 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 0A 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 0A 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 0B 00, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
[19:03:42]← comando 12H, endereço 10 00 0B 40, 45 byte(s): 00 00 00 00 00 00 08 00 00 00 08 00 ...
```

Fechei o BTS, a pedaleira enviou o seguinte:
```
[19:05:01]← comando 12H, endereço 7F 00 00 01, 1 byte(s): 00
```

Cliquei novamente em retrato do estado, obtive a seguinte resposta:
```
[19:06:16]=== RETRATO DO ESTADO — 19:06:16 ===
[19:06:16]← comando 12H, endereço 00 00 00 00, 45 byte(s): 00 00 00 0C 02 00 00 01 00 00 4A 00 ...
[19:06:16]00 00 00 00 (SystemCommon): 00 00 00 0C 02 00 00 01 00 00 4A 00 00 01 01 04 01 00 01 01 00 00 00 00 01 00 62 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 02 0B 05
[19:06:16]← comando 12H, endereço 00 00 10 00, 102 byte(s): 00 00 00 00 00 00 00 00 00 00 00 00 ...
[19:06:16]00 00 10 00 (SystemControl): 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 03 01 01 01 01 00 00 00 00 00 00 08 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 01 01
[19:06:16]← comando 12H, endereço 00 00 30 00, 21 byte(s): 00 00 10 01 00 00 00 01 00 00 00 00 ...
[19:06:16]00 00 30 00 (SystemMidi): 00 00 10 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00
[19:06:17]← comando 12H, endereço 00 00 40 00, 13 byte(s): 00 00 00 06 04 06 04 06 04 06 04 00 ...
[19:06:17]00 00 40 00 (SystemInOut): 00 00 00 06 04 06 04 06 04 06 04 00 00
[19:06:17]← comando 12H, endereço 00 00 50 00, 2 byte(s): 00 00
[19:06:17]00 00 50 00 (SystemEfct): 00 00
[19:06:17]← comando 12H, endereço 00 00 60 00, 7 byte(s): 00 01 0B 08 00 10 00
[19:06:17]00 00 60 00 (SystemPitch): 00 01 0B 08 00 10 00
[19:06:17]← comando 12H, endereço 00 20 00 00, 9 byte(s): 00 00 00 00 00 00 01 00 00
[19:06:17]00 20 00 00 (00 20 00 00 (não documentada)): 00 00 00 00 00 00 01 00 00
[19:06:17]← comando 12H, endereço 00 20 03 40, 18 byte(s): 01 00 20 20 20 0E 01 20 17 01 20 00 ...
[19:06:17]00 20 03 40 (00 20 03 40 (não documentada)): 01 00 20 20 20 0E 01 20 17 01 20 00 1D 20 00 04 0E 02
[19:06:17]=== fim do retrato ===
```
--------------------------------------

Funcionou perfeitamente. BTS fechado e sem as mensagens chatas no display.
Desmarquei o modo editor e as mensagens voltaram, marquei novamente e elas sumiram novamente.
--------------------------------------

Continuando com os testes.

- no bloco `x-compressor`
	- o parâmetro `razão de compressão` no hardware (ratio) tem a seguinte lista de valores: 1:1, 1.2:1, 1.4:1, 1.6:1, 1.8:1, 2:1, 2.3:1, 2.6:1, 3:1, 3.5:1, 4:1, 5:1, 6:1, 8:1, 10:1, 12:1, 20:1, INF:1. Na página os valores estão diferentes.
	- mesmo ocorre com o parâmetro equivalente no módulo `x-bass compressor (mdp)`
	
- no bloco `delay plus`
	- o parâmetro `tempo de delay` tem valores que vão de 1ms a 2000ms. Após o 2000ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	- o mesmo ocorre com os parâmetros `tempo 1` e `tempo 2` deste mesmo módulo.

- no bloco `analog delay`
	- o parâmetro `tempo de delay` tem valores que vão de 1ms a 1200ms. Após o 1200ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	
- no bloco `space echo`
	- o parâmetro `tempo de delay` tem valores que vão de 1ms a 2000ms. Após o 2000ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	
- no bloco `shimmer delay`
	- o parâmetro `tempo de delay` tem valores que vão de 1ms a 2000ms. Após o 2000ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	
- no bloco `warp`
	- o parâmetro `tempo de delay` tem valores que vão de 1ms a 2000ms. Após o 2000ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	
- no bloco `flanger`
	- o parâmetro `taxa do step` possui valores como: OFF, 0, 1, 2, 3, ..., 100. Na página os valores são como: 0, 1, 2, 3, ..., 100. 
	
- no bloco `bass flanger`
	- o parâmetro `taxa do step` possui valores como: OFF, 0, 1, 2, 3, ..., 100. Na página os valores são como: 0, 1, 2, 3, ..., 100. 
	
- no bloco `flanger prime`
	- o parâmetro `taxa do step` possui valores como: OFF, 0, 1, 2, 3, ..., 100. Na página os valores são como: 0, 1, 2, 3, ..., 100. 
	
- no bloco `bass flanger prime`
	- o parâmetro `taxa do step` possui valores como: OFF, 0, 1, 2, 3, ..., 100. Na página os valores são como: 0, 1, 2, 3, ..., 100. 
	
- nos blocos `harmonist` e `bass harmonist`
	- os parâmetro `atrazo da voz 1` e `atrazo de voz 2` tem valores que vão de 1ms a 300ms. Após o 300ms faltam os valores: 1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2, 1/1T, 1/2D, 1/1, 1/1D, 2/1.
	- os parâmetros `invervalo da voz 1` e `intervalo da voz 2` ficaram desativados na página. E seus valores parecem incorretos. No hardware o parâmetro `1:harmony` e `2:harmony` têm os seguintes valores: -2oct, -14th, -13th, -12th, -11th, -10th, -9th, -1oct, -7th, -6th, -5th, -4th, -3rd, -2nd, UNISON, +2nd, +3rd, +4th, +5th, +6th, +7th, +1oct, +9th, +10th, +11th, +12th, +13th, +14th, +2oct, USER.
	- os parâmetros`escala do usuário *` têm valores que vão de -24 semitons até +24 semitons (exibidos no hardware), mas os valores midi vão de 0 a 48. Parece que a página está tentando enviar valores negativos.
	

	
--------------------------------------

Próximo bloco a testar noise supressor
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
--------------------------------------
---------------------------------------