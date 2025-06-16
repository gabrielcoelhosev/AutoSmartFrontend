import * as React from "react"
import { GalleryVerticalEnd, Car, Users, MessageCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Estoque",
      url: "/veiculos",
      icon: Car,
      items: [
        {
          title: "Lista de Veículos",
          url: "/veiculos",
        },
        {
          title: "Adicionar Veículo",
          url: "/cadastro-veiculo",
        },
        {
          title: "Relatórios",
          url: "/veiculos/relatorios",
        },
      ],
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: Users,
      items: [
        {
          title: "Lista de Clientes",
          url: "/clientes",
        },
        {
          title: "Adicionar Cliente",
          url: "/cadastro-cliente",
        },
        {
          title: "Histórico",
          url: "/clientes/historico",
        },
      ],
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
      items: [
        {
          title: "Conversas Ativas",
          url: "/chat/ativas",
        },
        {
          title: "Histórico",
          url: "/chat/historico",
        },
        {
          title: "Configurações",
          url: "/configuracoes",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">MC Veículos</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    <item.icon className="size-4 mr-2" />
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}