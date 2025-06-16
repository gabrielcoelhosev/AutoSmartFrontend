import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Eye, MessageCircle, Car } from 'lucide-react';

export default function MessageConfigPage() {
  const [presentationMessage, setPresentationMessage] = useState(
    `Olá! 👋

Somos a MC Veículos, uma garagem especializada em carros de qualidade! 

🚗 Trabalhamos com veículos seminovos e usados
✅ Todos os carros passam por revisão completa
📍 Localização privilegiada
💰 Oferecemos as melhores condições de pagamento

Estamos aqui para ajudar você a encontrar o carro dos seus sonhos!

Em que posso ajudá-lo hoje?`
  );

  const [vehicleTemplate, setVehicleTemplate] = useState({
    message: `🚗 *Informações do Veículo*

📋 *Detalhes:*
• Marca: {marca}
• Modelo: {modelo}
• Ano: {ano}
• Cor: {cor}
• Quilometragem: {quilometragem} km
• Combustível: {combustivel}
• Transmissão: {transmissao}

💰 *Valor:* R$ {preco}

📝 *Observações:*
{observacoes}

📞 *Interessado?* Entre em contato conosco!
WhatsApp: (XX) XXXXX-XXXX

*MC Veículos - Sua garagem de confiança!* ✨`,
    fields: {
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: '2020',
      cor: 'Prata',
      quilometragem: '45.000',
      combustivel: 'Flex',
      transmissao: 'Automático',
      preco: '65.000',
      observacoes: 'Veículo em excelente estado, único dono, manual e chave reserva.'
    }
  });

  const [activeTab, setActiveTab] = useState('presentation');

  const handleSave = (type: any) => {
    // Aqui você salvaria as configurações
    alert(`${type === 'presentation' ? 'Mensagem de apresentação' : 'Template de veículo'} salvo com sucesso!`);
  };

  const generatePreview = () => {
    let preview = vehicleTemplate.message;
    (Object.keys(vehicleTemplate.fields) as Array<keyof typeof vehicleTemplate.fields>).forEach(key => {
      preview = preview.replace(new RegExp(`{${key}}`, 'g'), vehicleTemplate.fields[key]);
    });
    return preview;
  };

  const updateField = (field: keyof typeof vehicleTemplate.fields, value: string) => {
    setVehicleTemplate(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Configuração de Mensagens</h1>
          <p className="text-muted-foreground">
            Configure as mensagens automáticas para seus clientes
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border p-1">
            <button
              onClick={() => setActiveTab('presentation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'presentation'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Apresentação
            </button>
            <button
              onClick={() => setActiveTab('vehicle')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'vehicle'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Car className="w-4 h-4" />
              Veículos
            </button>
          </div>
        </div>

        {activeTab === 'presentation' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Mensagem de Apresentação
                </CardTitle>
                <CardDescription>
                  Esta mensagem será enviada quando um cliente entrar em contato pela primeira vez
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="presentation-message">Mensagem</Label>
                  <textarea
                    id="presentation-message"
                    value={presentationMessage}
                    onChange={(e) => setPresentationMessage(e.target.value)}
                    rows={12}
                    placeholder="Digite sua mensagem de apresentação..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('presentation')} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Mensagem
                  </Button>
                </div>

                <div className="mt-6 p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Preview:</h4>
                  <div className="whitespace-pre-wrap text-sm p-3 bg-muted rounded">
                    {presentationMessage}
                  </div>
                </div>
              </CardContent>
            </Card>
        )}

        {activeTab === 'vehicle' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Template da Mensagem
                  </CardTitle>
                  <CardDescription>
                    Configure o template para informações dos veículos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-template">Template da Mensagem</Label>
                    <textarea
                      id="vehicle-template"
                      value={vehicleTemplate.message}
                      onChange={(e) => setVehicleTemplate(prev => ({ ...prev, message: e.target.value }))}
                      rows={20}
                      placeholder="Configure o template da mensagem..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none font-mono"
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Variáveis disponíveis:</strong></p>
                    <p>{'{marca}'}, {'{modelo}'}, {'{ano}'}, {'{cor}'}, {'{quilometragem}'}</p>
                    <p>{'{combustivel}'}, {'{transmissao}'}, {'{preco}'}, {'{observacoes}'}</p>
                  </div>

                  <Button onClick={() => handleSave('vehicle')} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Preview & Teste
                  </CardTitle>
                  <CardDescription>
                    Preencha os dados para testar o template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="marca">Marca</Label>
                      <Input
                        id="marca"
                        value={vehicleTemplate.fields.marca}
                        onChange={(e) => updateField('marca', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modelo">Modelo</Label>
                      <Input
                        id="modelo"
                        value={vehicleTemplate.fields.modelo}
                        onChange={(e) => updateField('modelo', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ano">Ano</Label>
                      <Input
                        id="ano"
                        value={vehicleTemplate.fields.ano}
                        onChange={(e) => updateField('ano', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cor">Cor</Label>
                      <Input
                        id="cor"
                        value={vehicleTemplate.fields.cor}
                        onChange={(e) => updateField('cor', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quilometragem">Quilometragem</Label>
                      <Input
                        id="quilometragem"
                        value={vehicleTemplate.fields.quilometragem}
                        onChange={(e) => updateField('quilometragem', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="combustivel">Combustível</Label>
                      <Input
                        id="combustivel"
                        value={vehicleTemplate.fields.combustivel}
                        onChange={(e) => updateField('combustivel', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transmissao">Transmissão</Label>
                      <Input
                        id="transmissao"
                        value={vehicleTemplate.fields.transmissao}
                        onChange={(e) => updateField('transmissao', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preco">Preço</Label>
                      <Input
                        id="preco"
                        value={vehicleTemplate.fields.preco}
                        onChange={(e) => updateField('preco', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <textarea
                      id="observacoes"
                      value={vehicleTemplate.fields.observacoes}
                      onChange={(e) => updateField('observacoes', e.target.value)}
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>

                  <div className="mt-6 p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Preview da Mensagem:</h4>
                    <div className="whitespace-pre-wrap text-sm p-3 bg-muted rounded max-h-80 overflow-y-auto">
                      {generatePreview()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        )}
      </div>
    </div>
  );
}