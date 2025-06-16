import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Car, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function CadastrarVeiculo() {
    const [formData, setFormData] = useState({
        modelo: '',
        marca: '',
        ano: '' as string | number,
        cor: '',
        tag: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function postVeiculo() {
        setIsLoading(true);
        setMessage(null);
        try {
            const dataToSend = {
                ...formData,
                ano: Number(formData.ano)
            };
            
            const response = await fetch('http://localhost:5555/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar veículo');
            }

            setMessage({ type: 'success', text: 'Veículo cadastrado com sucesso!' });
            setFormData({
                modelo: '',
                marca: '',
                ano: '',
                cor: '',
                tag: ''
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

    const isFormValid = formData.modelo && formData.marca && formData.ano && formData.cor && formData.tag;

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
                                Cadastro de Veículos
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gerencie sua frota com facilidade
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            Sistema de Gestão
                        </Badge>
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
                                Novo Veículo
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-2">
                                Preencha as informações do veículo para adicionar à sua frota
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="modelo" className="text-sm font-medium text-gray-700">
                                    Modelo *
                                </Label>
                                <Input
                                    id="modelo"
                                    type="text"
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleChange}
                                    placeholder="Ex: Civic, Corolla, Onix"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="marca" className="text-sm font-medium text-gray-700">
                                    Marca *
                                </Label>
                                <Input
                                    id="marca"
                                    type="text"
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleChange}
                                    placeholder="Ex: Honda, Toyota, Chevrolet"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ano" className="text-sm font-medium text-gray-700">
                                    Ano *
                                </Label>
                                <Input
                                    id="ano"
                                    type="number"
                                    name="ano"
                                    value={formData.ano}
                                    onChange={handleChange}
                                    placeholder="2024"
                                    min="1900"
                                    max="2030"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cor" className="text-sm font-medium text-gray-700">
                                    Cor *
                                </Label>
                                <Input
                                    id="cor"
                                    type="text"
                                    name="cor"
                                    value={formData.cor}
                                    onChange={handleChange}
                                    placeholder="Ex: Branco, Preto, Prata"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tag" className="text-sm font-medium text-gray-700">
                                Tag/Identificação *
                            </Label>
                            <Input
                                id="tag"
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                placeholder="Ex: ABC-1234, Código interno"
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
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
                                onClick={postVeiculo}
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
                                        Cadastrar Veículo
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
                                {formData.modelo && (
                                    <div>
                                        <span className="font-medium text-gray-600">Modelo:</span> {formData.modelo}
                                    </div>
                                )}
                                {formData.marca && (
                                    <div>
                                        <span className="font-medium text-gray-600">Marca:</span> {formData.marca}
                                    </div>
                                )}
                                {formData.ano && (
                                    <div>
                                        <span className="font-medium text-gray-600">Ano:</span> {formData.ano}
                                    </div>
                                )}
                                {formData.cor && (
                                    <div>
                                        <span className="font-medium text-gray-600">Cor:</span> {formData.cor}
                                    </div>
                                )}
                                {formData.tag && (
                                    <div className="col-span-2">
                                        <span className="font-medium text-gray-600">Tag:</span> {formData.tag}
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