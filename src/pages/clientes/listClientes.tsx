import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

interface IClientes {
    id_cliente: number,
    nome: string,
    cpf: string,
    tag: string,
    data_nascimento: string
}

import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    MoreHorizontal,
    Car,
    ChevronDown
} from 'lucide-react'


export default function ClientesDataTable() {
    const [clientes, setClientes] = useState<IClientes[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('Todos')
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [showActionDropdown, setShowActionDropdown] = useState(0)


    useEffect(() => {
        getClientes();
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cadastro-veiculo');
    }

    function getClientes() {
        axios.get('http://localhost:5555/clientes')
            .then(response => {
                setClientes(response.data.dados);
            }).catch(error => {
                console.error('Erro ao bucar protudos', error);
            })
    }


    const statusOptions = ['Todos', 'Disponível', 'Vendido', 'Manutenção', 'Reservado']

    return (
        <div className="min-h-screen w-full p-6">
            <div className="w-full m-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bol mb-2">
                        Gestão de Clientes
                    </h1>
                    <p className="">
                        Gerencie todos os veículos do seu estoque
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className=" rounded-lg shadow-sm border  p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium ">
                                    Total de Clientes
                                </p>
                                <p className="text-3xl font-bold ">
                                    {clientes.length}
                                </p>
                            </div>
                            <Car className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                </div>

                <div className=" rounded-lg shadow-sm border ">
                    <div className="p-6 border-b ">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold ">Lista de Clientes</h2>
                            </div>
                            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700  px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                <Plus className="w-4 h-4" />
                                Cadastrar Cliente
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nome ou cpf..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className="min-w-[150px] px-4 py-2 border  rounded-lg  flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        {statusFilter}
                                    </div>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showStatusDropdown && (
                                    <div className="absolute right-0 mt-2 w-48  border  rounded-lg shadow-lg z-10">
                                        {statusOptions.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status)
                                                    setShowStatusDropdown(false)
                                                }}
                                                className="w-full text-left px-4 py-2  first:rounded-t-lg last:rounded-b-lg transition-colors"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border ">
                            <table className="w-full">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                            Nome
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                            cpf
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                            tag
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                            data_nascimento
                                        </th>
                                       
                                        <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" divide-y divide-gray-200">
                                    {clientes.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Car className="w-8 h-8 " />
                                                    <p className="">Nenhum veículo encontrado</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        clientes.map((cliente) => (
                                            <tr key={cliente.id_cliente} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
                                                    {cliente.id_cliente}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
                                                    {cliente.nome}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
                                                    {cliente.cpf}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
                                                    {cliente.tag}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
                                                    {cliente.data_nascimento}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setShowActionDropdown(showActionDropdown === cliente.id_cliente ? 0 : cliente.id_cliente)}
                                                            className="p-1 rounded-md "
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>

                                                        {showActionDropdown === cliente.id_cliente && (
                                                            <div className="absolute right-0 mt-2 w-48  rounded-lg shadow-lg z-10">
                                                                <button className="w-full text-left px-4 py-2  flex items-center gap-2 first:rounded-t-lg transition-colors">
                                                                    <Edit className="w-4 h-4" />
                                                                    Editar
                                                                </button>
                                                                <button className="w-full text-left px-4 py-2 0 flex items-center gap-2 text-red-600 last:rounded-b-lg transition-colors">
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
                            <p className="text-sm ">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

