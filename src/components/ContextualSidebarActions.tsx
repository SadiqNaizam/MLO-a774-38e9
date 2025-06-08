import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HelpCircle, MessageSquare, ShieldCheck } from 'lucide-react'; // Example icons

interface ActionItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  href?: string; // For navigation links
}

interface ContextualSidebarActionsProps {
  title?: string;
  actions: ActionItem[];
}

const ContextualSidebarActions: React.FC<ContextualSidebarActionsProps> = ({ title = "Quick Actions", actions }) => {
  console.log("Rendering ContextualSidebarActions with title:", title, "and actions:", actions.length);

  if (!actions || actions.length === 0) {
    console.log("No actions to display in ContextualSidebarActions.");
    return null; // Or some placeholder content
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <React.Fragment key={action.id}>
            <li>
              {action.href ? (
                <a
                  href={action.href}
                  onClick={action.onClick}
                  className="flex items-center p-2 rounded-md hover:bg-muted transition-colors w-full text-sm"
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                  {action.label}
                </a>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5 text-sm"
                  onClick={action.onClick}
                >
                  {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                  {action.label}
                </Button>
              )}
            </li>
            {index < actions.length - 1 && <Separator className="my-1" />}
          </React.Fragment>
        ))}
      </ul>
      {/* Example static links:
      <Separator className="my-3" />
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start text-sm">
          <HelpCircle className="mr-2 h-4 w-4" /> FAQ
        </Button>
        <Button variant="outline" className="w-full justify-start text-sm">
          <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
        </Button>
      </div>
      */}
    </div>
  );
};

export default ContextualSidebarActions;