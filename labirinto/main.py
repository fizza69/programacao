#MAPA DO LABIRINTO
direcao = ''
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

    # for linha in mapa:
    #     print(linha)

#MOVIMENTO DO JOGADOR



while True:
    #MOVIMENTAÇÃO PRA DIREITA

    direcao = input('Digite a direção (W/A/S/D): ')
    if direcao == 'D':
        jogador_coluna = jogador_coluna + 1
        print('Coluna:', jogador_coluna)
        for linha in mapa:
            print(linha)
        
        # MOVIMENTO PRA ESQUERDA
    if direcao == 'A':  
        jogador_coluna = jogador_coluna - 1
        print('Coluna:', jogador_coluna)
        for linha in mapa:
             print(linha)

    






