import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ContextualSidebarActions from '@/components/ContextualSidebarActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, LogOut, PlusCircle, ListFilter, FileDown, CreditCard, Lock, Eye, Users } from 'lucide-react';

const accountActions = [
  { id: 'new-account', label: 'Open New Account', icon: PlusCircle, onClick: () => console.log('Open new account') },
  { id: 'download-all', label: 'Download All Statements', icon: FileDown, href: '/statements/all' },
  { id: 'filter-accounts', label: 'Filter Accounts', icon: ListFilter, onClick: () => console.log('Filter accounts') },
];

const placeholderAccounts = [
  { id: 'acc1', type: 'Checking', name: 'Primary Checking', balance: '$45,231.89', status: 'Active', lastActivity: '2024-07-22' },
  { id: 'acc2', type: 'Savings', name: 'High-Yield Savings', balance: '$12,100.50', status: 'Active', lastActivity: '2024-07-20' },
  { id: 'acc3', type: 'Joint', name: 'Family Joint Account', balance: '$8,750.00', status: 'Active', lastActivity: '2024-07-21' },
  { id: 'acc4', type: 'Credit Card', name: 'Platinum Rewards CC', balance: '-$567.12', status: 'Active', lastActivity: '2024-07-23' },
];

const placeholderTransactions = [
  { id: 'txn1', date: '2024-07-23', description: 'Amazon Purchase', amount: '-$129.99', category: 'Shopping' },
  { id: 'txn2', date: '2024-07-22', description: 'Salary Deposit', amount: '+$2,500.00', category: 'Income' },
  { id: 'txn3', date: '2024-07-22', description: 'Grocery Store', amount: '-$75.20', category: 'Groceries' },
  { id: 'txn4', date: '2024-07-21', description: 'Utility Bill', amount: '-$150.00', category: 'Bills' },
];

const AccountsPage = () => {
  console.log('AccountsPage loaded');
  const [selectedAccount, setSelectedAccount] = useState(placeholderAccounts[0]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Header (Similar to DashboardPage) */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/accounts" className="font-semibold">Accounts</NavigationMenuLink>
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
                                </div>
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
            <PopoverTrigger asChild><Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button></PopoverTrigger>
            <PopoverContent align="end"><div className="p-4 text-sm">No new notifications.</div></PopoverContent>
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
              <DropdownMenuItem onClick={() => window.location.href='/settings-profile'}><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
              <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 p-4 sm:px-6 sm:py-0 gap-4">
        <div className="hidden md:block w-64">
          <ContextualSidebarActions title="Account Actions" actions={accountActions} />
        </div>
        <div className="flex-1 py-6">
          <h1 className="text-2xl font-semibold mb-6">My Accounts</h1>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2 md:w-1/2">
              <TabsTrigger value="overview">Accounts Overview</TabsTrigger>
              <TabsTrigger value="details">Account Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Accounts</CardTitle>
                  <CardDescription>Summary of your financial accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {placeholderAccounts.map((acc) => (
                        <TableRow key={acc.id} onClick={() => {setSelectedAccount(acc); /* Trigger tab switch if needed */ }} className="cursor-pointer">
                          <TableCell className="font-medium">{acc.name}</TableCell>
                          <TableCell>{acc.type}</TableCell>
                          <TableCell>{acc.balance}</TableCell>
                          <TableCell><Badge variant={acc.status === 'Active' ? 'default' : 'secondary'}>{acc.status}</Badge></TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedAccount(acc); /* Programmatically switch to details tab here */ }}>View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedAccount.name} - Details</CardTitle>
                  <CardDescription>Transactions and management options for this account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-x-2">
                      <Input placeholder="Filter transactions..." className="max-w-sm" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="bills">Bills</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline"><CreditCard className="mr-2 h-4 w-4" />Manage Card</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage Card for {selectedAccount.name}</DialogTitle>
                          <DialogDescription>
                            {selectedAccount.type === 'Credit Card' ? 'View card details, set limits, or freeze your card.' : 'This account does not have a manageable card.'}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAccount.type === 'Credit Card' && (
                           <div className="grid gap-4 py-4">
                            <Button variant="outline"><Eye className="mr-2 h-4 w-4"/>View Card Details</Button>
                            <Button variant="destructive"><Lock className="mr-2 h-4 w-4"/>Freeze Card</Button>
                           </div>
                        )}
                        <DialogFooter>
                          <Button variant="secondary" onClick={() => console.log('Close dialog')}>Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {placeholderTransactions.map((txn) => (
                        <TableRow key={txn.id}>
                          <TableCell>{txn.date}</TableCell>
                          <TableCell className="font-medium">{txn.description}</TableCell>
                          <TableCell className={txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>{txn.amount}</TableCell>
                          <TableCell><Badge variant="outline">{txn.category}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="default" className="mt-4 w-full"><FileDown className="mr-2 h-4 w-4"/>Download Statement</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AccountsPage;