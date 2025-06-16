import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Car, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function CadastrarCliente() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        tag: '' ,
        data_nascimento: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function postCliente() {
        setIsLoading(true);
        setMessage(null);
        try {
           
            
            const response = await fetch('http://localhost:5555/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar veículo');
            }

            setMessage({ type: 'success', text: 'Veículo cadastrado com sucesso!' });
            setFormData({
                nome: '',
                cpf: '',
                tag: '',
                data_nascimento: ''
            });
        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
            setMessage({ type: 'error', text: 'Erro ao cadastrar veículo. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'ano' ? Number(value) : value
        }));
    }

    const isFormValid = formData.nome && formData.cpf && formData.tag && formData.data_nascimento;

    return (
        <div className="min-h-screen  p-6 ">
            <div className="min-h-screen ml-70 p-6 w-[calc(100%)] ">
                <div className="mb-8 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent ">
                                Cadastro de Clientes
                            </h1>

                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline">
                            Novo Cadastro
                        </Badge>
                    </div>
                </div>

                <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-4 pb-8">
                        <div className="text-center">
                            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-2">
                                <Car className="w-5 h-5 text-blue-600" />
                                Novo Cliente
                            </CardTitle>
                          
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="modelo" className="text-sm font-medium text-gray-700">
                                    Nome *
                                </Label>
                                <Input
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="marca" className="text-sm font-medium text-gray-700">
                                    cpf *
                                </Label>
                                <Input
                                    id="cpf"
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ano" className="text-sm font-medium text-gray-700">
                                    tag *
                                </Label>
                                <Input
                                    id="tag"
                                    type="text"
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    min="1900"
                                    max="2030"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                        <div className="space-y-2">
                            <Label htmlFor="tag" className="text-sm font-medium text-gray-700">
                                Data de Nascimento *
                            </Label>
                            <Input
                                id="data_nascimento"
                                type="date"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={handleChange}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                           
                        </div>

                        {message && (
                            <Alert className={`border-l-4 ${
                                message.type === 'success' 
                                    ? 'border-l-green-500 bg-green-50 text-green-800' 
                                    : 'border-l-red-500 bg-red-50 text-red-800'
                            }`}>
                                {message.type === 'success' ? (
                                    <CheckCircle className="h-4 w-4" />
                                ) : (
                                    <AlertCircle className="h-4 w-4" />
                                )}
                                <AlertDescription className="font-medium">
                                    {message.text}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="pt-4">
                            <Button
                                onClick={postCliente}
                                disabled={isLoading || !isFormValid}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Cadastrando...
                                    </>
                                ) : (
                                    <>
                                        <Car className="w-4 h-4 mr-2" />
                                        Cadastrar Cliente
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                            <p>* Campos obrigatórios</p>
                        </div>
                    </CardContent>
                </Card>

                {Object.values(formData).some(value => value !== '') && (
                    <Card className="max-w-2xl mx-auto mt-6 bg-gray-50 border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-700">Prévia do Cadastro</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {formData.nome && (
                                    <div>
                                        <span className="font-medium text-gray-600">Nome:</span> {formData.nome}
                                    </div>
                                )}
                                {formData.cpf && (
                                    <div>
                                        <span className="font-medium text-gray-600">Cpf:</span> {formData.cpf}
                                    </div>
                                )}
                                {formData.tag && (
                                    <div>
                                        <span className="font-medium text-gray-600">Tag:</span> {formData.tag}
                                    </div>
                                )}
                                {formData.data_nascimento && (
                                    <div>
                                        <span className="font-medium text-gray-600">Data Nascimento:</span> {formData.data_nascimento}
                                    </div>
                                )}
                                
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}