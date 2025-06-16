import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Car, Loader2, CheckCircle, AlertCircle, Upload, X, Image as ImageIcon, Users, Send } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



// Tipagem para as tags
interface Tag {
    id_tag: string;
    descricao: string;
}

// Tipagem para os possíveis compradores
interface PossiveisCompradores {
    id_cliente: string;
    nome: string;
    cpf: string;
    tag: string;
    data_nascimento: Date
}

export function CadastrarVeiculo() {
    const [formData, setFormData] = useState({
        modelo: '',
        marca: '',
        ano: '' as string | number,
        cor: '',
        tag: ''
    });

   

    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // Estados para o modal de possíveis compradores
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [possiveisCompradores, setPossiveisCompradores] = useState<PossiveisCompradores[]>([]);
    const [loadingMatch, setLoadingMatch] = useState(false);
    const [tagDescricaoAtual, setTagDescricaoAtual] = useState('');

    useEffect(() => {
        getTags()
    }, [])

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [tags, setTags] = useState<Tag[]>([]); // Tipagem correta

    async function getTags() {
        try {
            const response = await axios.get('http://localhost:5555/tags');
            console.log('Tags recebidas:', response.data.dados); // Para debug
            setTags(response.data.dados || []);
        } catch (error) {
            console.error('Erro ao buscar tags:', error);
            setTags([]);
        }
    }

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

            const tagSelecionada = tags.find(tag => tag.descricao === formData.tag);
            if (tagSelecionada) {
                setTagDescricaoAtual(tagSelecionada.descricao);
                await buscarPossiveisCompradores(tagSelecionada.descricao);
            }

            // Limpar formulário
            setFormData({
                modelo: '',
                marca: '',
                ano: '',
                cor: '',
                tag: ''
            });
            setImages([]);
            setImagePreviews([]);

        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
            setMessage({ type: 'error', text: 'Erro ao cadastrar veículo. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    }

    // Função para buscar possíveis compradores
    async function buscarPossiveisCompradores(tagDescricao: string) {
        setLoadingMatch(true);
        try {
            const response = await axios.post('http://localhost:5555/match', {
                descricao: tagDescricao
            });

            console.log('Response aqui', response.data.dados)

            if (response.data.dados) {
                setPossiveisCompradores(response.data.dados || response.data || []);
                setShowMatchModal(true);

            }


        } catch (error) {
            console.error('Erro ao buscar possíveis compradores:', error);
            setMessage({ type: 'error', text: 'Erro ao buscar possíveis compradores.' });
        } finally {
            setLoadingMatch(false);
        }
    }

    // Função para enviar para clientes
    const enviarParaClientes = () => {
        setShowMatchModal(false);
        setMessage({ type: 'success', text: 'Informações enviadas para os clientes!' });
    };

    // Função separada para inputs normais
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'ano' ? Number(value) : value
        }));
    }

    // Função específica para o Select
    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            tag: value
        }));
    }

    // Função para lidar com upload de imagens
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        if (images.length + files.length > 3) {
            setMessage({ type: 'error', text: 'Máximo de 3 imagens por veículo.' });
            return;
        }

        const validFiles = files.filter(file => {
            const isValid = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

            if (!isValid) {
                setMessage({ type: 'error', text: 'Apenas arquivos de imagem são permitidos.' });
                return false;
            }

            if (!isValidSize) {
                setMessage({ type: 'error', text: 'Imagem deve ter no máximo 5MB.' });
                return false;
            }

            return true;
        });

        if (validFiles.length > 0) {
            const newImages = [...images, ...validFiles].slice(0, 3);
            setImages(newImages);

            // Criar previews
            const newPreviews = [...imagePreviews];
            validFiles.forEach(file => {
                if (newPreviews.length < 3) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setImagePreviews(prev => [...prev, e.target?.result as string].slice(0, 3));
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Limpar o input
        event.target.value = '';
    };

    // Função para remover imagem
    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const isFormValid = formData.modelo && formData.marca && formData.ano && formData.cor && formData.tag;

    return (
        <div className="min-h-screen w-full p-6 ">
            <div className="m-auto w-full ">
                <div className="mb-8 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r bg-clip-text ">
                                Cadastro de Veículos
                            </h1>
                            <p>
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

                <Card className="max-w-2xl mx-auto shadow-xl border-0 backdrop-blur-sm">
                    <CardHeader className="space-y-4 pb-8">
                        <div className="text-center">
                            <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                                <Car className="w-5 h-5 text-blue-600" />
                                Novo Veículo
                            </CardTitle>
                            <CardDescription className="mt-2">
                                Preencha as informações do veículo para adicionar à sua frota
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="modelo" className="text-sm font-medium">
                                    Modelo *
                                </Label>
                                <Input
                                    id="modelo"
                                    type="text"
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Civic, Corolla, Onix"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="marca" className="text-sm font-medium">
                                    Marca *
                                </Label>
                                <Input
                                    id="marca"
                                    type="text"
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Honda, Toyota, Chevrolet"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ano" className="text-sm font-medium">
                                    Ano *
                                </Label>
                                <Input
                                    id="ano"
                                    type="number"
                                    name="ano"
                                    value={formData.ano}
                                    onChange={handleInputChange}
                                    placeholder="2024"
                                    min="1900"
                                    max="2030"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cor" className="text-sm font-medium">
                                    Cor *
                                </Label>
                                <Input
                                    id="cor"
                                    type="text"
                                    name="cor"
                                    value={formData.cor}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Branco, Preto, Prata"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tag" className="text-sm font-medium">
                                Tag/Identificação *
                            </Label>
                            <Select value={formData.tag} onValueChange={handleSelectChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tags.length > 0 ? (
                                        tags.map((tag) => (
                                            <SelectItem key={tag.id_tag} value={tag.descricao}>
                                                {tag.descricao}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-gray-500 text-center">
                                            Nenhuma tag disponível
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Upload de Imagens */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium">
                                Imagens do Veículo (Máximo 3)
                            </Label>

                            {/* Area de Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                    disabled={images.length >= 3}
                                />
                                <Label
                                    htmlFor="image-upload"
                                    className={`cursor-pointer flex flex-col items-center gap-2 ${images.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'
                                        }`}
                                >
                                    <div className="p-3 bg-gray-100 rounded-full">
                                        <Upload className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {images.length >= 3 ? 'Limite de imagens atingido' : 'Clique para adicionar imagens'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG, JPEG até 5MB cada
                                        </p>
                                    </div>
                                </Label>
                            </div>

                            {/* Preview das Imagens */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                {index + 1}/3
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Contador de imagens */}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>{images.length} de 3 imagens</span>
                                </div>
                                {images.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setImages([]);
                                            setImagePreviews([]);
                                        }}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        Remover todas
                                    </Button>
                                )}
                            </div>
                        </div>

                        {message && (
                            <Alert className={`border-l-4 ${message.type === 'success'
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
                    <Card className="max-w-2xl mx-auto mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg ">Prévia do Cadastro</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {formData.modelo && (
                                    <div>
                                        <span className="font-medium ">Modelo:</span> {formData.modelo}
                                    </div>
                                )}
                                {formData.marca && (
                                    <div>
                                        <span className="font-medium ">Marca:</span> {formData.marca}
                                    </div>
                                )}
                                {formData.ano && (
                                    <div>
                                        <span className="font-medium ">Ano:</span> {formData.ano}
                                    </div>
                                )}
                                {formData.cor && (
                                    <div>
                                        <span className="font-medium ">Cor:</span> {formData.cor}
                                    </div>
                                )}
                                {formData.tag && (
                                    <div className="col-span-2">
                                        <span className="font-medium ">Tag:</span> {
                                            tags.find(tag => tag.id_tag === formData.tag)?.descricao || formData.tag
                                        }
                                    </div>
                                )}
                                {images.length > 0 && (
                                    <div className="col-span-2">
                                        <span className="font-medium ">Imagens:</span> {images.length} arquivo(s) selecionado(s)
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
            <Dialog open={showMatchModal} onOpenChange={setShowMatchModal}>
                <DialogContent className="w-full max-w-6xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Users className="w- h-5 text-blue-600" />
                            Possíveis Compradores Encontrados
                        </DialogTitle>
                        <DialogDescription>
                            Encontramos {possiveisCompradores.length} possível(is) comprador(es) para o veículo com tag "{tagDescricaoAtual}"
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {loadingMatch ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                <span className="ml-2">Buscando possíveis compradores...</span>
                            </div>
                        ) : possiveisCompradores.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Cpf</TableHead>
                                            <TableHead>Tag</TableHead>
                                            <TableHead>Data nascimento</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {possiveisCompradores.map((comprador, index) => (
                                            <TableRow key={comprador.id_cliente || index}>
                                                <TableCell className="font-medium">
                                                    {comprador.nome}
                                                </TableCell>
                                                <TableCell>{comprador.cpf}</TableCell>
                                                <TableCell>{comprador.tag}</TableCell>
                                                <TableCell>{comprador.data_nascimento.toString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhum comprador encontrado
                                </h3>
                                <p className="text-gray-500">
                                    Não encontramos possíveis compradores para esta categoria no momento.
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowMatchModal(false)}
                        >
                            Fechar
                        </Button>
                        {possiveisCompradores.length > 0 && (
                            <Button
                                onClick={enviarParaClientes}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Enviar para Clientes
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}