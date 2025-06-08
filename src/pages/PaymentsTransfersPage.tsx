import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ContextualSidebarActions from '@/components/ContextualSidebarActions';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Bell, Settings, LogOut, Users, CalendarPlus, ListChecks, Repeat, HelpCircle } from 'lucide-react';

const paymentActions = [
  { id: 'add-payee', label: 'Add New Payee', icon: Users, onClick: () => console.log('Add Payee') },
  { id: 'schedule-payment', label: 'Schedule a Payment', icon: CalendarPlus, onClick: () => console.log('Schedule Payment') },
  { id: 'manage-standing', label: 'Manage Standing Orders', icon: Repeat, href: '/payments/standing-orders' },
  { id: 'payment-faq', label: 'Payment FAQs', icon: HelpCircle, href: '/faq/payments' },
];

const pastPayments = [
  { id: 'pay1', date: '2024-07-20', recipient: 'John Doe', amount: '$150.00', status: 'Completed' },
  { id: 'pay2', date: '2024-07-18', recipient: 'Utility Company', amount: '$75.50', status: 'Completed' },
  { id: 'pay3', date: '2024-07-15', recipient: 'Jane Smith (Rent)', amount: '$1,200.00', status: 'Completed' },
];

const paymentFormSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account"),
  toAccount: z.string().min(1, "Beneficiary account number is required"),
  beneficiaryName: z.string().min(1, "Beneficiary name is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  paymentType: z.enum(["domestic", "international"]),
  reference: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentsTransfersPage = () => {
  console.log('PaymentsTransfersPage loaded');
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentType: "domestic",
    },
  });

  function onSubmit(data: PaymentFormValues) {
    console.log("Payment submitted:", data);
    // Trigger AlertDialog for confirmation
  }

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
              <NavigationMenuLink href="/accounts">Accounts</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/payments-transfers" className="font-semibold">Payments</NavigationMenuLink>
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
        <div className="hidden md:block w-72">
          <ContextualSidebarActions title="Payment Options" actions={paymentActions} />
        </div>
        <div className="flex-1 py-6">
          <h1 className="text-2xl font-semibold mb-6">Payments & Transfers</h1>
          
          <section className="grid md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Quickly send money to a beneficiary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fromAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Account</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="primary-checking">Primary Checking (...1234)</SelectItem>
                              <SelectItem value="savings-main">Savings Account (...5678)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="domestic" /></FormControl>
                                <FormLabel className="font-normal">Domestic Transfer</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="international" /></FormControl>
                                <FormLabel className="font-normal">International Transfer</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="beneficiaryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Beneficiary Name</FormLabel>
                          <FormControl><Input placeholder="e.g., John Smith" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="toAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Beneficiary Account Number</FormLabel>
                          <FormControl><Input placeholder="e.g., 00112233445566" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="reference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reference (Optional)</FormLabel>
                          <FormControl><Input placeholder="e.g., Invoice #123" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="submit" className="w-full">Review & Send Payment</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                          <AlertDialogDescription>
                            You are about to send {form.getValues("amount") ? `$${form.getValues("amount").toFixed(2)}` : 'an amount'} to {form.getValues("beneficiaryName") || "the beneficiary"}.
                            Please review the details before confirming.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => console.log('Payment confirmed!', form.getValues())}>Confirm & Send</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your recent outgoing payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">{payment.recipient}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell><Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>{payment.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="link" className="mt-4 px-0">View All Payment History</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PaymentsTransfersPage;