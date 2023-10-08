import { Search, Database, Rabbit } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DatasetsContent from "./DatasetsContent"
import ModelsContent from "./ModelsContent"
import PromptsContent from "./PromptsContent"
import "./ContentTabs.scss"

const ContentTabs = () => {
    return (
        <Tabs defaultValue="explore" className="w-[100%] text-center h-[100%]">
            <TabsList className="max-w-[400px]">
                <TabsTrigger value="explore">Explore <Search className="ml-2 h-4 w-4" /></TabsTrigger>
                <TabsTrigger value="datasets">Datasets <Database className="ml-2 h-4 w-4" /></TabsTrigger>
                <TabsTrigger value="models">Model Zoo<Rabbit className="ml-2 h-4 w-4" /></TabsTrigger>
            </TabsList>
            <TabsContent className="custom-height" value="explore">
                <PromptsContent />
            </TabsContent>
            <TabsContent className="custom-height" value="datasets">
                <DatasetsContent />
            </TabsContent>
            <TabsContent className="custom-height" value="models">
                <ModelsContent />
            </TabsContent>
        </Tabs>
    )
}

export default ContentTabs