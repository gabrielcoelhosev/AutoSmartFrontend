import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

interface IVeiculos {
    id_veiculo: number,
    modelo: string,
    marca: string,
    ano: number,
    cor: string,
    placa: string
    tag: string,
    disponivel: boolean
}

import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    MoreHorizontal,
    Car,
    Calendar,
    ChevronDown
} from 'lucide-react'


export default function VehiclesDataTable() {
    const [veiculos, setVeiculos] = useState<IVeiculos[]>([])
    const [disponiveis, setDisponveis] = useState<Number>();
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('Todos')
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [showActionDropdown, setShowActionDropdown] = useState(0)


    useEffect(() => {
        getVeiculos();
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastro-veiculo');
    }


    function getVeiculos() {
        axios.get('http://localhost:5555/veiculos')
            .then(response => {
                setVeiculos(response.data.dados);
                setDisponveis(response.data.dados.filter((v: IVeiculos) => v.disponivel === true).length)
            }).catch(error => {
                console.error('Erro ao bucar protudos', error);
            })
        console.log('Feito a Req');
    }


    const statusOptions = ['Todos', 'Disponível', 'Vendido', 'Manutenção', 'Reservado']

    return (
        <div className="min-h-screen p-6">
            <div className="ml-64 w-[calc(100%)]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Gestão de Veículos
                    </h1>
                    <p className="text-gray-600">
                        Gerencie todos os veículos do seu estoque
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total de Veículos
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {veiculos.length}
                                </p>
                            </div>
                            <Car className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Disponíveis
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {disponiveis?.toString()}
                                </p>

                            </div>
                            <Calendar className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Lista de Veículos</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Visualize e gerencie todos os veículos cadastrados
                                </p>
                            </div>
                            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                <Plus className="w-4 h-4" />
                                Adicionar Veículo
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar por modelo, marca ou placa..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className="min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        {statusFilter}
                                    </div>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showStatusDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {statusOptions.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status)
                                                    setShowStatusDropdown(false)
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Veículo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marca
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ano
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Placa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Situação
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {veiculos.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Car className="w-8 h-8 text-gray-300" />
                                                    <p className="text-gray-500">Nenhum veículo encontrado</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        veiculos.map((vehicle) => (
                                            <tr key={vehicle.id_veiculo} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {vehicle.id_veiculo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {vehicle.modelo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {vehicle.marca}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {vehicle.ano.toString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {vehicle.cor}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {vehicle.ano}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {vehicle.tag}
                                                </td>

                                                {vehicle.disponivel ?
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-green-300">
                                                        Disponível
                                                    </td>
                                                    : <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-red-400">
                                                        Indisponível
                                                    </td>
                                                }

                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setShowActionDropdown(showActionDropdown === vehicle.id_veiculo ? 0 : vehicle.id_veiculo)}
                                                            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>

                                                        {showActionDropdown === vehicle.id_veiculo && (
                                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 first:rounded-t-lg transition-colors">
                                                                    <Edit className="w-4 h-4" />
                                                                    Editar
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600 last:rounded-b-lg transition-colors">
                                                                    <Trash2 className="w-4 h-4" />
                                                                    Excluir
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <p className="text-sm text-gray-600">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

