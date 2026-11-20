import {useEffect} from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SeoHead({title, description, jsonLd}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const existingScript = document.getElementById('nexlivo-dynamic-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'nexlivo-dynamic-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const dynamicScript = document.getElementById('nexlivo-dynamic-jsonld');
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, jsonLd]);

  return null;
}
