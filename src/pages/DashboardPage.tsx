import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ContextualSidebarActions from '@/components/ContextualSidebarActions';
import FinancialOverviewChart from '@/components/FinancialOverviewChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CreditCard, DollarSign, Home, LogOut, Settings, Users, TrendingUp, ArrowRightLeft } from 'lucide-react';

const placeholderChartData = [
  { name: 'Jan', value1: 4000, value2: 2400 },
  { name: 'Feb', value1: 3000, value2: 1398 },
  { name: 'Mar', value1: 2000, value2: 9800 },
  { name: 'Apr', value1: 2780, value2: 3908 },
  { name: 'May', value1: 1890, value2: 4800 },
  { name: 'Jun', value1: 2390, value2: 3800 },
];

const sidebarActions = [
  { id: 'quick-transfer', label: 'Quick Transfer', icon: ArrowRightLeft, onClick: () => console.log('Quick Transfer clicked') },
  { id: 'pay-bills', label: 'Pay Bills', icon: DollarSign, onClick: () => console.log('Pay Bills clicked') },
  { id: 'view-statements', label: 'View Statements', href: '/statements' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard" className="font-semibold">Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/accounts">Accounts</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/payments-transfers">Payments</NavigationMenuLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuTrigger>Joint Accounts</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                                <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/joint-account-creation"
                                >
                                <Users className="h-6 w-6" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                    Open Joint Account
                                _</div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    Start a new joint account application with ease.
                                </p>
                                </a>
                            </NavigationMenuLink>
                        </li>
                         <li><NavigationMenuLink href="/joint-accounts/manage">Manage Existing</NavigationMenuLink></li>
                         <li><NavigationMenuLink href="/joint-accounts/benefits">Benefits</NavigationMenuLink></li>
                         <li><NavigationMenuLink href="/joint-accounts/faq">FAQ</NavigationMenuLink></li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="p-4">
                <h4 className="font-medium leading-none">Notifications</h4>
                <p className="text-sm text-muted-foreground mt-1">You have 3 unread messages.</p>
                {/* Placeholder notifications */}
                <div className="mt-4 grid gap-2">
                    <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-500 mt-1"/>
                        <div>
                            <p className="text-sm font-medium">Large deposit received</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-3">
                        <CreditCard className="h-5 w-5 text-blue-500 mt-1"/>
                        <div>
                            <p className="text-sm font-medium">New card shipped</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                    </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href='/settings-profile'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 p-4 sm:px-6 sm:py-0 gap-4">
        <div className="hidden md:block w-64">
           <ContextualSidebarActions title="Quick Actions" actions={sidebarActions} />
        </div>
        <ScrollArea className="flex-1">
          <div className="py-6 grid gap-6">
            <h1 className="text-2xl font-semibold">Welcome Back, User!</h1>
            
            {/* Account Summaries */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Primary Account</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,100.50</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Joint Account</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,750.00</div>
                  <p className="text-xs text-muted-foreground">Managed with Partner</p>
                </CardContent>
              </Card>
            </section>

            {/* Financial Overview Chart */}
            <section>
              <FinancialOverviewChart
                title="Monthly Spending Overview"
                description="An overview of your spending and income for the last 6 months."
                data={placeholderChartData}
                chartType="bar"
              />
            </section>

            {/* Recent Activity */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>A quick look at your latest transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for recent activity list */}
                  <ul className="space-y-3">
                    <li className="flex justify-between"><span>Grocery Store</span> <span className="text-red-600">-$75.20</span></li>
                    <li className="flex justify-between"><span>Salary Deposit</span> <span className="text-green-600">+$2,500.00</span></li>
                    <li className="flex justify-between"><span>Online Purchase</span> <span className="text-red-600">-$129.99</span></li>
                  </ul>
                  <Button variant="outline" className="mt-4 w-full">View All Transactions</Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default DashboardPage;