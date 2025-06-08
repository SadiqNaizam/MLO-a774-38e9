import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import GuidedMultiStepForm from '@/components/GuidedMultiStepForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Progress is part of shadcn/ui, but MultiStepProgressIndicator is custom and used by GuidedMultiStepForm internally.
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Bell, Settings, LogOut, Users, FileText, UserCheck, ShieldCheck, Award, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Step 1: Personal Details (Applicant 1)
const PersonalDetailsStep1: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Applicant 1: Personal Information</h3>
    <div>
      <Label htmlFor="fullName1">Full Name</Label>
      <Input id="fullName1" placeholder="Your Full Name" />
    </div>
    <div>
      <Label htmlFor="email1">Email Address</Label>
      <Input id="email1" type="email" placeholder="your.email@example.com" />
    </div>
    <div>
      <Label htmlFor="phone1">Phone Number</Label>
      <Input id="phone1" type="tel" placeholder="+1 (555) 123-4567" />
    </div>
    <div>
      <Label htmlFor="dob1">Date of Birth</Label>
      <Input id="dob1" type="date" />
    </div>
    <div>
      <Label htmlFor="address1">Residential Address</Label>
      <Input id="address1" placeholder="123 Main St, Anytown, USA" />
    </div>
  </div>
);

// Step 2: Inviting Applicant 2 / Applicant 2 Details
const Applicant2DetailsStep: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Applicant 2: Information</h3>
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Invite Applicant 2</AlertTitle>
      <AlertDescription>
        Please provide the details for the second applicant. They may receive an invitation to confirm their information.
      </AlertDescription>
    </Alert>
    <div>
      <Label htmlFor="fullName2">Full Name</Label>
      <Input id="fullName2" placeholder="Applicant 2's Full Name" />
    </div>
    <div>
      <Label htmlFor="email2">Email Address</Label>
      <Input id="email2" type="email" placeholder="applicant2.email@example.com" />
    </div>
    {/* Add more fields as needed, similar to Applicant 1 */}
  </div>
);

// Step 3: Account Configuration
const AccountConfigStep: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Account Configuration</h3>
    <div>
      <Label htmlFor="accountType">Select Account Type</Label>
      <Select>
        <SelectTrigger id="accountType">
          <SelectValue placeholder="Choose account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="joint-checking">Joint Checking Account</SelectItem>
          <SelectItem value="joint-savings">Joint Savings Account</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="initialDeposit">Initial Deposit (Optional)</Label>
      <Input id="initialDeposit" type="number" placeholder="0.00" />
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="overdraftProtection" />
      <Label htmlFor="overdraftProtection">Enable Overdraft Protection (if available)</Label>
    </div>
  </div>
);

// Step 4: Document Upload (Simulated)
const DocumentUploadStep: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Identity Verification</h3>
    <Alert variant="default">
      <FileText className="h-4 w-4" />
      <AlertTitle>Document Upload</AlertTitle>
      <AlertDescription>
        To verify your identities, you may be required to upload documents such as a driver's license or passport.
        (This is a simulated step.)
      </AlertDescription>
    </Alert>
    <div>
      <Label htmlFor="docType1">Applicant 1: Document Type</Label>
      <Select>
        <SelectTrigger id="docType1"><SelectValue placeholder="Select document" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="dl">Driver's License</SelectItem>
          <SelectItem value="passport">Passport</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="fileUpload1">Applicant 1: Upload Document</Label>
      <Input id="fileUpload1" type="file" />
    </div>
    {/* Repeat for Applicant 2 */}
  </div>
);

// Step 5: Review & Consent
const ReviewConsentStep: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Review & Consent</h3>
    <Alert variant="destructive">
      <ShieldCheck className="h-4 w-4" />
      <AlertTitle>Important: Review Carefully</AlertTitle>
      <AlertDescription>
        Please review all the information provided by both applicants. Ensure everything is accurate before submitting.
      </AlertDescription>
    </Alert>
    <Card>
        <CardHeader><CardTitle>Applicant 1 Summary</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">Full Name: [Placeholder Name], Email: [Placeholder Email]...</p></CardContent>
    </Card>
     <Card>
        <CardHeader><CardTitle>Applicant 2 Summary</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">Full Name: [Placeholder Name 2], Email: [Placeholder Email 2]...</p></CardContent>
    </Card>
     <Card>
        <CardHeader><CardTitle>Account Configuration Summary</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">Type: Joint Checking, Initial Deposit: $0.00...</p></CardContent>
    </Card>
    <div className="flex items-start space-x-2 pt-4">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="text-sm">
        We, the applicants, confirm that all information provided is true and accurate. We agree to the bank's <a href="/terms" className="underline" target="_blank">Terms and Conditions</a> and <a href="/privacy" className="underline" target="_blank">Privacy Policy</a> for opening a joint account.
      </Label>
    </div>
  </div>
);


const formSteps = [
  { id: 'personal-details-1', name: 'Applicant 1 Info', component: <PersonalDetailsStep1 /> },
  { id: 'applicant-2-details', name: 'Applicant 2 Info', component: <Applicant2DetailsStep /> },
  { id: 'account-config', name: 'Account Setup', component: <AccountConfigStep /> },
  { id: 'doc-upload', name: 'Verification', component: <DocumentUploadStep /> },
  { id: 'review-consent', name: 'Review & Submit', component: <ReviewConsentStep /> },
];

const JointAccountCreationPage = () => {
  console.log('JointAccountCreationPage loaded');

  const handleFormSubmit = async (formData: any) => {
    console.log('Joint Account Form Submitted:', formData);
    // API call to submit data would go here
    // Show success message
    alert('Joint account application submitted successfully! We will review your application and get back to you.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Header */}
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
      <main className="flex-1 p-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
            <Award className="h-5 w-5 text-blue-600" />
            <AlertTitle className="font-semibold">Welcome to Joint Account Creation!</AlertTitle>
            <AlertDescription>
              Opening a joint account is a simple process. Follow the steps below to get started.
              This secure process will guide you through providing necessary details for both applicants.
            </AlertDescription>
          </Alert>
          <GuidedMultiStepForm
            steps={formSteps}
            formTitle="Open a New Joint Account"
            onFormSubmit={handleFormSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default JointAccountCreationPage;