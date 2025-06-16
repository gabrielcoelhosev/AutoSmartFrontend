import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@radix-ui/react-label"

interface Tag {
  id_tag: number
  descricao: string
}

export default function SettingsTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [descricao, setDescricao] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:5555/tags")
      setTags(response.data.dados)
    } catch (error) {
      // pode adicionar um toast aqui se quiser
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const handleAddTag = async () => {
    if (!descricao.trim()) return

    try {
      setLoading(true)
      await axios.post("http://localhost:5555/tags", { descricao: descricao.trim() })
      setDescricao("")
      await fetchTags()
    } catch (error) {
      // pode adicionar um toast aqui também
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full px-4 py-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">Configurações - Tags</h1>

        {/* Formulário de Nova Tag */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Nova Tag</h2>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Tag</Label>
              <Input
                id="descricao"
                placeholder="Digite a descrição da tag"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />
              <Button onClick={handleAddTag} disabled={loading}>
                {loading ? "Adicionando..." : "Adicionar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Listagem */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tags Cadastradas</h2>
            {tags.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma tag cadastrada.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tags.map(tag => (
                    <TableRow key={tag.id_tag}>
                      <TableCell>{tag.id_tag}</TableCell>
                      <TableCell>{tag.descricao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
