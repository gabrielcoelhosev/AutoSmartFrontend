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
import { ModeToggle } from "./mode-toggle"

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
          isActive: true,
        },
        {
          title: "Adicionar Veículo",
          url: "/cadastro-veiculo",
          isActive: false,
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
          isActive: false,
        },
        {
          title: "Adicionar Cliente",
          url: "/cadastro-cliente",
          isActive: false,
        },

      ],
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
      items: [
        {
          title: "Mensagens",
          url: "/mensagens",
          isActive: false,
        },

        {
          title: "Configurações",
          url: "/configuracoes",
          isActive: false,
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
                <div className="flex flex-col gap-0.5 leading-none pr-15">
                  <span className="font-medium">MC Veículos</span>
                  <span className="">v1.0.0</span>
                </div>
                  <ModeToggle/>
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
