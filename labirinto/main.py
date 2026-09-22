#MAPA DO LABIRINTO
mapa = [
 '#################',
 '#               #',
 '#               #',
 '#               #',
 '#               #',
 '#              E#',
 '#################'
]
#MAPA APARECER
#for linha in mapa:
#    print (linha)
#POSIÇÃO DO JOGADOR E JOGADOR
jogador_linha = 1
jogador_coluna = 1
texto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
#TESTE
#print ()
#print(linha)
#print(linha[jogador_coluna])
#MUDANÇA DE CARACTER
print ()
mapa[jogador_linha] = (
    mapa[jogador_linha][:jogador_coluna]
    + 'P'
    + mapa[jogador_linha][jogador_coluna + 1:]
)

for linha in mapa:
    print(linha)
#MOVIMENTO DO JOGADOR
while True:
    direcao = input('Digite a direção (W/A/S/D): ')
    if direcao == 'D':
        mapa[jogador_linha] = (
            #TIRAR O P
            mapa[jogador_linha][:jogador_coluna]
            + ' '
            + mapa[jogador_linha][jogador_coluna + 1:]
            )
        #COLOCAR O P NA NOVA POSIÇÃO

        mapa[jogador_linha] = (
            mapa[jogador_linha][:jogador_coluna + 1]
            + 'P'
            + mapa[jogador_linha][jogador_coluna :3]
        )
        break
    
for linha in mapa:
    print(linha)

