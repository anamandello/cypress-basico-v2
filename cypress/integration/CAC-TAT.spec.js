describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
      cy.visit('./src/index.html')
  })

  it('verifica título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Flávia')
    cy.get('#email').type('ana@testecypress.com')
    cy.get('#product').select('Blog')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('999999999')
    cy.get('#open-text-area').type('Ótimo atendimento')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
  })

  it('delay no type', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Flávia')
    cy.get('#email').type('ana@testecypress.com')
    cy.get('#product').select('Blog')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('999999999')
    cy.get('#open-text-area').type('Ótimo atendimento Ótimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimentoÓtimo atendimento', {
      delay: 0
    })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
  })
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Flávia')
    cy.get('#email').type('ana')
    cy.get('#product').select('Blog')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('999999999')
    cy.get('#open-text-area').type('Ótimo atendimento')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Flávia')
    cy.get('#email').type('ana@testecypress.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('dsadsa').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Flávia')
    cy.get('#email').type('ana@testecypress.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('dsadsa').should('have.value', '')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
    cy.get('#lastName').type('Flávia').should('have.value', 'Flávia').clear().should('have.value', '')
    cy.get('#email').type('ana@testecypress.com').should('have.value', 'ana@testecypress.com').clear().should('have.value','')
    cy.get('#phone').type('123456').should('have.value', '123456').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Ana', 'Flávia', 'ana@cypresteste.com.br', '12345655', 'Ótimo atendimento!!!!!!!!')
    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value=feedback]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]').should('length', '3').each((item) => {
      cy.wrap(item).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get("#file-upload").selectFile('./cypress/fixtures/example.json').should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get("#file-upload").selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get("#file-upload").selectFile('@samplefile', { action: 'drag-drop' })
    .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('div#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('div#privacy a').invoke('removeAttr', 'target').click()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.get('div#privacy a').invoke('removeAttr', 'target').click()
    cy.get('h1#title').should('have.text', 'CAC TAT - Política de privacidade')
  })
})