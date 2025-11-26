import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Mail, FileText, Users, Settings, Lightbulb, UserCheck, Calendar, MessageCircle } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Think Tank',
        href: '/admin/think-tank',
        icon: UserCheck,
    },
    {
        title: 'Participants',
        href: '/admin/event-participants',
        icon: Calendar,
    },
    {
        title: 'Idées',
        href: '/admin/ideas',
        icon: Lightbulb,
    },
    {
        title: 'Biographie',
        href: '/admin/content',
        icon: FileText,
    },
    {
        title: 'Newsletter',
        href: '/admin/newsletter',
        icon: Mail,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: MessageCircle,
    }

];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
