import { Badge } from "@/components/ui/badge";

export function ApiStatus() {
  return (
    <div className="max-h-[300px] space-y-8 overflow-scroll px-6">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-green-600">Active</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-green-600">Active</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="destructive">Down</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-yellow-400">Warning</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-yellow-400">Warning</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-yellow-400">Warning</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-yellow-400">Warning</Badge>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-medium leading-none">
            <Badge>GET</Badge>
            <p>/api/question/</p>
          </div>
          <p className="text-sm text-muted-foreground">get random question</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge className=" bg-yellow-400">Warning</Badge>
        </div>
      </div>
    </div>
  );
}
