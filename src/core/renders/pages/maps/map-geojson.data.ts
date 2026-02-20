import type { FeatureCollection, Geometry } from "geojson";

export const SUAPE_GEOJSON: FeatureCollection<Geometry> = {
  type: "FeatureCollection",
  features: [
    /* ------------------------------------------------------------------ */
    /* EMPRESAS (CSV)                                                     */
    /* ------------------------------------------------------------------ */

    {
      type: "Feature",
      properties: { id: 1, nome: "APM TERMINALS SUAPE LTDA", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.979434, -8.377175] },
    },

    {
      type: "Feature",
      properties: { id: 2, nome: "ESTALEIRO ATLÂNTICO SUL", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.973412, -8.372266] },
    },
    {
      type: "Feature",
      properties: { id: 2, nome: "ESTALEIRO ATLÂNTICO SUL", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.974723, -8.376262] },
    },

    {
      type: "Feature",
      properties: { id: 3, nome: "VARD PROMAR S/A", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.97225, -8.370474] },
    },

    {
      type: "Feature",
      properties: {
        id: 4,
        nome: "INDORAMA VENTURES POLÍMEROS S/A (ANTIGA M&G POLÍMEROS)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-35.003042, -8.374049] },
    },

    {
      type: "Feature",
      properties: {
        id: 5,
        nome: "PQS / ALPEK POLYESTER BRASIL (CITEPE)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-35.013817, -8.389322] },
    },
    {
      type: "Feature",
      properties: {
        id: 5,
        nome: "PQS / ALPEK POLYESTER BRASIL (CITEPE)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-35.018829, -8.396834] },
    },
    {
      type: "Feature",
      properties: {
        id: 5,
        nome: "PQS / ALPEK POLYESTER BRASIL (CITEPE)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-35.014192, -8.393272] },
    },

    {
      type: "Feature",
      properties: {
        id: 6,
        nome: "REFINARIA ABREU E LIMA - RNEST (PETROBRAS)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-35.021509, -8.380754] },
    },

    {
      type: "Feature",
      properties: { id: 7, nome: "SUA GRANÉIS SPE LTDA", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.973391, -8.388035] },
    },

    {
      type: "Feature",
      properties: {
        id: 8,
        nome: "BUNGE ALIMENTOS S/A (MOINHO)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.982716, -8.394272] },
    },

    {
      type: "Feature",
      properties: { id: 9, nome: "TECON SUAPE S.A", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.967188, -8.394262] },
    },

    {
      type: "Feature",
      properties: {
        id: 10,
        nome: "MOVECTA - SUATA SERV. UNIF. DE ARM. E TERM. ALF.",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.9768, -8.393457] },
    },
    {
      type: "Feature",
      properties: {
        id: 10,
        nome: "MOVECTA - SUATA SERV. UNIF. DE ARM. E TERM. ALF.",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.974085, -8.393156] },
    },

    {
      type: "Feature",
      properties: { id: 11, nome: "DECAL BRASIL LTDA", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.978031, -8.397181] },
    },

    {
      type: "Feature",
      properties: { id: 12, nome: "OGMO", tipo: "empresa" },
      geometry: { type: "Point", coordinates: [-34.980876, -8.39701] },
    },

    {
      type: "Feature",
      properties: {
        id: 13,
        nome: "MINASGÁS / SUPERGASBRAS",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.976594, -8.396865] },
    },

    {
      type: "Feature",
      properties: {
        id: 14,
        nome: "NACIONAL GÁS DISTRIBUIDORA LTDA",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.971244, -8.398161] },
    },

    {
      type: "Feature",
      properties: {
        id: 15,
        nome: "ULTRACARGO LOGÍSTICA S/A (TEQUIMAR)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.972409, -8.397555] },
    },

    {
      type: "Feature",
      properties: {
        id: 16,
        nome: "SEARA ALIMENTOS LTDA (ÓLEO)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.973269, -8.395957] },
    },
    {
      type: "Feature",
      properties: {
        id: 16,
        nome: "SEARA ALIMENTOS LTDA (MARGARINA)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.974158, -8.398785] },
    },

    {
      type: "Feature",
      properties: {
        id: 17,
        nome: "LIQUIGÁS DISTRIBUIDORA S/A",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.974305, -8.396345] },
    },
    {
      type: "Feature",
      properties: {
        id: 17,
        nome: "COPAGAZ DISTRIBUIDORA DE GÁS S/A",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.975014, -8.396485] },
    },

    {
      type: "Feature",
      properties: {
        id: 18,
        nome: "TRANSPETRO (PETROBRAS TRANSPORTE S/A)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.969038, -8.399115] },
    },

    {
      type: "Feature",
      properties: {
        id: 19,
        nome: "POOL DE SUAPE (VIBRA / IPIRANGA / RAÍZEN)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.9658, -8.400536] },
    },

    {
      type: "Feature",
      properties: {
        id: 20,
        nome: "USINA TERMELÉTRICA TERMOPERNAMBUCO (NEOENERGIA)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.967422, -8.404397] },
    },

    {
      type: "Feature",
      properties: {
        id: 21,
        nome: "TEMAPE - TERMINAIS MARÍTIMOS DE PERNAMBUCO S/A",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.964889, -8.404025] },
    },

    {
      type: "Feature",
      properties: {
        id: 22,
        nome: "PANDENOR IMPORTAÇÃO E EXPORTAÇÃO SPE LTDA",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.963404, -8.400732] },
    },

    {
      type: "Feature",
      properties: {
        id: 23,
        nome: "ULTRAGAZ (BAHIANA DISTRIBUIDORA DE GÁS LTDA)",
        tipo: "empresa",
      },
      geometry: { type: "Point", coordinates: [-34.975797, -8.396692] },
    },
  ],
};
