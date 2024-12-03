import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="item-1" className="border-slate-700 bg-white/5 backdrop-blur-lg rounded-lg">
          <AccordionTrigger className="text-white px-4">What types of fires can the system detect?</AccordionTrigger>
          <AccordionContent className="text-slate-300 px-4">
            Our system can detect various types of fires, including building fires, forest fires, and industrial fires, with high accuracy across different environments and conditions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-slate-700 bg-white/5 backdrop-blur-lg rounded-lg">
          <AccordionTrigger className="text-white px-4">What image formats are supported?</AccordionTrigger>
          <AccordionContent className="text-slate-300 px-4">
            The system supports common image formats including JPG, PNG, and JPEG. Maximum file size is 5MB.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-slate-700 bg-white/5 backdrop-blur-lg rounded-lg">
          <AccordionTrigger className="text-white px-4">How accurate is the fire detection?</AccordionTrigger>
          <AccordionContent className="text-slate-300 px-4">
            Our model achieves over 95% accuracy on validated test cases, with continuous improvements through regular training updates.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};