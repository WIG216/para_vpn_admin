/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import List from "./list";
import { Button, ButtonProps } from "../ui/button";

export interface ActionProps  {
    title: string;
    onSelect?: (props?: any) => void;
    setUrl?: (data: any) => string;
    icon?: any;
    desc?: string;
    type?: "separator" | "item";
    className?: any;
    buttonProps?: ButtonProps;
};
  
interface TableActionProps {
    title: string;
    actions?: ActionProps[];
    label?: string;
    icon?: any;
    isAction?: boolean;
    data?: any;
    type?: AType;
    iconSize?: "icon" | "icon-sm";
  };
  
const TableAction = (props: TableActionProps) => {
  const Icon: any = props.icon || MoreHorizontal;

  if (props.type === "button") {
    return (
      <div className="flex  gap-2">
        <List
          data={props.actions || []}
          renderer={(action, i) => {
            let Icon: any;
            if (typeof action.icon === "function") {
              Icon = action.icon(props.data);
            } else {
              Icon = action.icon;
            }

            const onSelect = () => {
              if (action.onSelect) {
                action.onSelect(props.data);
              }
            };

            const getUrl = () => {
              return action.setUrl
                ? action.setUrl(props.data)
                : action.buttonProps?.href;
            };

            const className = cn("flex items-center gap-2", action.className);

            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={props.iconSize || "icon"}
                      key={i}
                      {...action.buttonProps}
                      className={className}
                      onClick={onSelect}
                      href={getUrl()}
                    >
                      {action.icon && <Icon className="size-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }}
        />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {props.isAction ? (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{props.title}</span>
            <Icon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline">
            <span className="font-medium mr-2">{props.title}</span>
            <Icon className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.label && <DropdownMenuLabel>{props.label}</DropdownMenuLabel>}
        <List
          data={props.actions || []}
          renderer={(action, i) => {
            const Icon: any = action.icon;

            const onSelect = () => {
              if (action.onSelect) {
                action.onSelect(props.data);
              }
            };

            if (action.type === "separator") {
              return <DropdownMenuSeparator key={i} />;
            }
            const className = cn("flex items-center gap-2", action.className);

            return (
              <DropdownMenuItem
                key={i}
                className={className}
                onSelect={onSelect}
              >
                {action.icon && <Icon className="size-4" />}
                {action.title}
              </DropdownMenuItem>
            );
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
