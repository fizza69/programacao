#Nome do guerreiro
print ('---- Jogo de Batalha ----')
nome = input('Qual o nome do guerreiro: ')
print (f'Bem-vindo {nome}!')
#STATUS DO GUERREIRO
print ()
vida = 100
ataque = 20
print (f'Vida: {vida}')
print (f'Ataque: {ataque}')
#INIMIGO
print ()
print ('Um inimigo apareceu!')
nomeinimigo = 'Goblin'
vidainimigo = 80
ataqueinimigo = 15
print (f'O inimigo é um {nomeinimigo}!')
print (f'Ele tem {vidainimigo} de vida, e tem {ataqueinimigo} de ataque.')
#GUERREIRO ATACAR INIMIGO
vidainimigo = vidainimigo - ataque
print ()
print (f'Você vai atacar o {nomeinimigo}!')
print (f'O {nomeinimigo} ficou com {vidainimigo} de vida')
