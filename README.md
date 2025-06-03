# 👗 Swedle – Gestão de Clientes e Medidas para Costureiros e Alfaiates

<p align="center">
<img src= "https://github.com/user-attachments/assets/7caaede0-4d33-4c4d-9e9a-1420f3840192" alt="icon" width="150" />
</p>



## 📋 Sobre o Projeto

**Swedle** é um aplicativo desenvolvido em React Native com Expo, 
criado para facilitar o dia a dia de costureiros e alfaiates. 
Com ele, é possível cadastrar clientes, registrar e visualizar suas medidas corporais de forma prática e organizada.
O principal objetivo do app é garantir que profissionais da costura não percam mais as medidas de seus clientes,
evitando anotações em papéis soltos ou registros difíceis de acessar. A ideia surgiu da observação de uma necessidade real no setor: 
ter sempre à mão as informações essenciais de cada cliente, de maneira segura, intuitiva e acessível, promovendo um atendimento mais profissional e ágil.


## 🎯 Funcionalidades Principais

- 🧵 **Cadastro de Clientes:** Nome, telefone, observações e foto de perfil  
- 📏 **Registro de Medidas:** Adição, edição e exclusão de medidas corporais por cliente  
- 🧠 **Memória Visual:** Imagem do cliente associada ao cadastro  
- 📂 **Organização por Cards:** Clientes exibidos em cartões com acesso rápido  
- 📱 **Interface Responsiva:** Design otimizado para dispositivos móveis  
- 🔐 **Autenticação Firebase:** Registro e login seguro  
- ☁️ **Dados na Nuvem:** Firestore para armazenamento confiável e em tempo real

---

## 🛠️ Tecnologias Utilizadas

- **React Native** – Framework principal para apps mobile  
- **Expo** – Plataforma para desenvolvimento e testes  
- **Firebase** – Backend completo:
  - Authentication (Login/Registro)  
  - Firestore Database (Dados dos clientes e medidas)  
- **React Navigation** – Navegação entre telas  
- **Context API** – Gerenciamento de estado do usuário  
- **React Native Vector Icons** – Ícones personalizados

---

## 📋 Requisitos do Projeto

| Requisito                      | Status | Implementação                          |
|-------------------------------|--------|----------------------------------------|
| Aplicativo React Native       | ✅     | Usando Expo                            |
| Navegação entre telas         | ✅     | Stack + Tab Navigator implementados    |
| Autenticação com Firebase     | ✅     | Registro, login e logout               |
| Estado Global (Context API)   | ✅     | Contextos de Auth e Theme (autenticação e tema) |
| CRUD de entidade              | ✅     | Clientes e medidas                     |
| Design responsivo             | ✅     | Interface responsiva com design moderno            |

---

## 🚀 Como Executar o Projeto

### 📱 Pré-requisitos

- Node.js (v14 ou superior)  
- npm ou yarn  
- Expo CLI  
- App Expo Go no celular

### 📥 Instalação

```bash
git clone https://github.com/Marynxs/Swedle
cd Swedle
npm install # ou yarn install
npx expo start
```
### 📱 Executando no Celular
Instale o app Expo Go

Escaneie o QR Code que aparece no terminal

Certifique-se de que celular e computador estão na mesma rede

### 💡 Problemas? Tente:

```bash
npx expo start --tunnel
```

### 🔥 Configuração do Firebase
#### 🔐 Authentication
Método: Email/Password

Registro e login de usuários

#### ☁️ Firestore
Coleções:

**clientes** – Dados dos clientes

**medidas** – Lista de medidas vinculadas ao cliente

#### 🔒 Regras de Segurança

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 👥 Funcionalidades por Tela

### 🏠 Tela Inicial (Lista de Clientes)
- Visualização de todos os clientes cadastrados
- Exibição em formato de cards com nome, imagem e botão de acesso rápido
- Navegação para adicionar novos clientes

### ➕ Tela de Cadastro de Cliente
- Cadastro de novo cliente com nome, telefone e foto
- Adição de medidas corporais personalizadas (ex: busto, cintura, quadril)
- Validação de campos obrigatórios

### 📏 Tela de Visualização de Medidas
- Listagem clara de todas as medidas do cliente
- Exibição organizada com nome da medida e valor em centímetros
- Design responsivo para facilitar a leitura rápida
- Possibilidade de excluir um cliente

### ✏️ Tela de Edição de Cliente
- Edição de dados do cliente (nome, observações, foto, medidas)
- Possibilidade de excluir medidas ou adicionar novas
- Atualização automática no banco de dados

### ⚙️ Tela de Configurações
- Alteração de email e senha do usuário
- Alternância entre tema claro e escuro
- Logout seguro da conta

### 🔐 Tela de Login/Registro
- Autenticação via Firebase (email e senha)
- Registro de novos usuários
- Validação de formulários
- Indicadores de carregamento durante o login ou registro
- Tratamento de erros como email inválido, senha incorreta ou usuário inexistente

🤝 Contribuição
Este projeto foi desenvolvido como parte de uma iniciativa acadêmica com foco em resolver um problema real. Ficou interessado em colaborar? Sinta-se livre para abrir issues ou fazer pull requests!

Desenvolvido com 💙 por Matheus Marini e Agatha Santos
